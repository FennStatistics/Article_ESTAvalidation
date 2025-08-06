# ==============================================================================
# R-Code - Rayyan outputs
# date of creation: XX 2022
# authors: Julius Fenn
# ==============================================================================

#############################
save_graphic <- function(filename){
  tmp <- paste(filename, ".png", sep = "")
  Cairo::Cairo(file=tmp,
               type="png",
               units="px",
               width=3000,
               height=2000,
               pointsize=44, #text is shrinking by saving graphic
               dpi= "auto",
               bg = "white")
}



#####################
cleanAbstracts <- function(setStatus = getStatus){
  tmp_abstracts <- articles[articles$status == setStatus &
                              !is.na(articles$status), "abstract"]

  ## clean up abstracts:
  tmp_abstracts <- tolower(x = tmp_abstracts)
  # remove all stopwords
  tmp_abstracts <- removeWords(tmp_abstracts, words = stopwords(kind = "en"))
  # remove all abbreviations
  tmp_abstracts <- str_replace_all(tmp_abstracts, " \\s*\\([^\\)]+\\)", "")
  # remove all punctuation
  tmp_abstracts <- str_replace_all(tmp_abstracts, "[:punct:]", "")
  # remove all n white spaces
  tmp_abstracts <- str_squish(string = tmp_abstracts)

  return(tmp_abstracts)
}



#####################
createWordCloud <- function(nameWordcloud = NULL,
                            getStatus = "Included",
                            minNchar = 100,
                            minFreqWords = 5,
                            Ngram = 1,
                            removeWord = NULL,
                            plotinR = FALSE){

  tmp_abstracts <- cleanAbstracts(setStatus = getStatus)

  ## ! take care of abstracts with nchar < 100!
  if(any(nchar(tmp_abstracts) < minNchar)){
    cat("It seems that you have in your dataset entries with no proper abstact",
        "numbers of characters lower than", minNchar, "\n",
        "> this are the abstracts with the following index (were removed): \n")
    cat(c(1:length(tmp_abstracts))[nchar(tmp_abstracts) < minNchar])
  }
  tmp_abstracts <- tmp_abstracts[nchar(tmp_abstracts) >= minNchar]

  ## create corupus
  tm_corpus <- VCorpus(x = VectorSource(tmp_abstracts))

  ## create N tdm - set Ngram
  BigramTokenizer <- function(x) NGramTokenizer(x, Weka_control(min = Ngram, max = Ngram))
  tdm_Ngram = TermDocumentMatrix(tm_corpus,
                                  control = list(tokenize = BigramTokenizer))
  ## create dataset
  freq = sort(rowSums(as.matrix(tdm_Ngram)),decreasing = TRUE)
  freq.df = data.frame(word=names(freq), freq=freq)
  # freq.df <- freq.df[31:nrow(freq.df), ]

  if(!is.null(removeWord)){
    freq.df = freq.df[str_detect(string = freq.df$word,
                                 pattern = removeWord, negate = TRUE),]
  }

  save_graphic(filename = nameWordcloud)
  ## plot wordcloud
  wordcloud(words = freq.df$word, freq = freq.df$freq, min.freq = minFreqWords,
            max.words=300, random.order=FALSE, rot.per=0.35,
            colors=brewer.pal(8, "Dark2"))
  dev.off()


  if(plotinR){
    wordcloud(words = d$word, freq = d$freq, min.freq = minFreqWords,
              max.words=300, random.order=FALSE, rot.per=0.35,
              colors=brewer.pal(8, "Dark2"))
  }

}

####################
checkSimilarityExactMatches <- function(getStatus = "Included",
                                        lowerTri = TRUE,
                                        minNchar = 100){

  tmp_abstracts <- cleanAbstracts(setStatus = getStatus)


  ### hierachical clustering based on similarity between abstracts
  tmp_abstracts_stem <- stemDocument(tmp_abstracts, language = "english")

  ## ! take care of abstracts with nchar < 100!
  if(any(nchar(tmp_abstracts_stem) < minNchar)){
    cat("It seems that you have in your dataset entries with no proper abstact",
        "numbers of characters lower than", minNchar, "\n",
        "> this are the abstracts with the following index (were removed): \n")
    cat(c(1:length(tmp_abstracts_stem))[nchar(tmp_abstracts_stem) < minNchar])
  }
  tmp_abstracts_stem <- tmp_abstracts_stem[nchar(tmp_abstracts_stem) >= minNchar]

  mat <- matrix(data = NA, nrow = length(tmp_abstracts_stem), ncol = length(tmp_abstracts_stem))
  for(r in 1:length(tmp_abstracts_stem)){
    for(c in 1:length(tmp_abstracts_stem)){
      tmp <- sum(words(tmp_abstracts_stem[r]) %in% words(tmp_abstracts_stem[c])) /
        length(words(tmp_abstracts_stem[r]))
      mat[r,c] <- tmp
    }
  }


  if(lowerTri){
    cat("\n   show data for upper triangular")
    mat[lower.tri(mat)] <- NA
  }else{
    cat("\n   show data for lower triangular")
    mat[upper.tri(mat)] <- NA
  }

  d=dist(mat, method = "euclidean", upper = FALSE, diag = FALSE)
  # hclust_dist[is.na(d)] <- 0
  # hclust_dist[is.nan(d)] <- 0
  # sum(is.infinite(d))  # THIS SHOULD BE 0

  hc=hclust(d,method="ward.D2")
  plot(hc)


  tmp_ids <- articles[articles$status == getStatus &
                        !is.na(articles$status), "key"]
  return(tmp_ids)
}

##################################################
getWordCorrelations <- function(getStatus = "Included", minWords = 10,
                                plotCors = FALSE, wordsCor = NULL, namePlotCor = NULL){
  tmp_abstracts <- cleanAbstracts(setStatus = "Included")

  ## set up tibble
  tmp_abstracts_tibble <- tibble(tmp_abstracts)
  colnames(tmp_abstracts_tibble) <- "txt"
  # add IDs for abstracts
  tmp_abstracts_tibble$abstracts <- 1:nrow(tmp_abstracts_tibble)



  ## compute correlations (phi coefficient)
  singlewords <- tmp_abstracts_tibble %>%
    unnest_tokens(words, txt, token = "ngrams", n = 1)
  word_cors <- singlewords %>%
    group_by(words) %>%
    filter(n() >= minWords) %>%
    widyr::pairwise_cor(words, abstracts, sort = TRUE)

  ## how many removed
  tmp <- sum(as.numeric(table(singlewords$words)) < minWords) / length(as.numeric(table(singlewords$words)))
  cat("by defining the treshold of", minWords, "words, you have removed",
      round(x = tmp, digits = 2)*100,
      "% of your data \n")


  if(plotCors){
    ## plot correlation
    corsPlotted <- word_cors %>%
      filter(item1 %in% wordsCor) %>%
      group_by(item1) %>%
      slice_max(correlation, n = 10) %>%
      ungroup() %>%
      mutate(item2 = reorder(item2, correlation)) %>%
      ggplot(aes(item2, correlation)) +
      geom_bar(stat = "identity") +
      facet_wrap(~ item1, scales = "free") +
      coord_flip()
    return(list(word_cors, corsPlotted))
  }else{
    return(word_cors)
  }


}


############################################
getBigramNetwork <- function(getStatus = "Included", minWords = 3){
  tmp_abstracts <- cleanAbstracts(setStatus = "Included")

  ## set up tibble
  tmp_abstracts_tibble <- tibble(tmp_abstracts)
  colnames(tmp_abstracts_tibble) <- "txt"
  # add IDs for abstracts
  tmp_abstracts_tibble$abstracts <- 1:nrow(tmp_abstracts_tibble)


  ngrams <- tmp_abstracts_tibble %>%
    unnest_tokens(bigram, txt, token = "ngrams", n = 2)


  n_separated <- ngrams %>%
    separate(bigram, c("word1", "word2"), sep = " ")

  n_filtered <- n_separated %>%
    filter(!word1 %in% stop_words$word) %>%
    filter(!word2 %in% stop_words$word)

  # new bigram counts:
  n_counts <- n_filtered %>%
    count(word1, word2, sort = TRUE)


  ## how many removed
  tmp <- n_counts %>%
    filter(n < minWords)
  tmp <- nrow(tmp) / nrow(n_counts)

  cat("by defining the treshold of", minWords, "words, you have removed",
      round(x = tmp, digits = 2)*100,
      "% of your data \n")



  n_graph <- n_counts %>%
    filter(n >= minWords) %>%
    graph_from_data_frame()


  set.seed(2017)
  ggraph(n_graph, layout = "fr") +
    geom_edge_link() +
    geom_node_point() +
    geom_node_text(aes(label = name), vjust = 1, hjust = 1)
}


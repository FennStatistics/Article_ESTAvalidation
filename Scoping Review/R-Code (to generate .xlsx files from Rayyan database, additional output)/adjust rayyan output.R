# ==============================================================================
# R-Code - Rayyan outputs
# date of creation: Mai, June 2022
# authors: Julius Fenn
# ==============================================================================
rm(list=ls()); dev.off()

### sets the directory of location of this script as the current directory
setwd(dirname(rstudioapi::getSourceEditorContext()$path))
getwd()


############################################################################
# load packages, functions, data, data preperation
############################################################################
################
# packages
################
# if packages are not already installed, the function will install and activate them
usePackage <- function(p) {
  if (!is.element(p, installed.packages()[,1]))
    install.packages(p, dep = TRUE)
  require(p, character.only = TRUE)
}
## Error handling installing packages in R base
# options(repos="https://CRAN.R-project.org")

usePackage("tidyverse")
usePackage("xlsx") # to save as xlsx

usePackage("tm") # wordlists, cleaning functions
usePackage("RWeka")

usePackage("wordcloud")
usePackage("tidytext")

usePackage("igraph")

usePackage("stringdist")

usePackage("ggraph")

# usePackage("reticulate")
rm(usePackage)


################
# load additional functions
################
source("functions.R", encoding="utf-8")



################
# data
################
dir()
articles  <- read.csv(file = "articles.csv")
customizations  <- read.csv(file = "customizations_log.csv")

### get ID value
articles$key <- str_remove_all(string = articles$key, pattern = "-|[:alpha:]")
articles$key <- as.double(articles$key)

# > check if all TRUE
all(customizations$article_id %in% articles$key)


### remove constants
articles$pubmed_id <- NULL
articles$pmc_id <- NULL


################
# data preperation
################
# table(articles$notes)
glimpse(articles)
articles$status <- NA
articles$label <- NA

for(i in 1:nrow(articles)){
  # print(i)
  if(articles[i,]$notes != ""){
    tmp <- articles[i,]$notes
    if(str_detect(string = tmp, pattern = "RAYYAN-LABELS")){
      tmp <- str_extract(string = tmp, pattern = "(?<==>).*")
      tmp <- str_remove_all(string = tmp, pattern = "RAYYAN-LABELS")
    }else{
      tmp <- str_extract(string = tmp, pattern = "(?<==>).*")
    }
    tmp <- str_remove_all(string = tmp, pattern = "[:punct:]")
    tmp <- str_split(string = tmp, pattern = "\\|", simplify = TRUE)
    # print(tmp)

    if(length(tmp) == 2){
      articles$status[i] <- str_trim(string = tmp[1])
      articles$label[i] <- str_trim(string = tmp[2])
    }else{
      articles$status[i] <- str_trim(string = tmp)
    }

  }
}

############################################################################
# get relevant sub-dataset
############################################################################
################
# descriptive
################
glimpse(articles)
table(articles$status)
table(articles$label)

## only consider included articles and remove constants
inc_articles <- articles[articles$status == "Included",]
inc_articles$month <- NULL
inc_articles$day <- NULL
inc_articles$url <- NULL
table(inc_articles$label)


## save additionally considered articles
tmp_exc <- inc_articles[str_detect(string = inc_articles$label, pattern = "^exc"),]
tmp_exc$label <- str_remove_all(string = tmp_exc$label, pattern = "^exc")

write.xlsx2(x = tmp_exc, file = "additionally considered articles.xlsx")

## save all included articles
tmp_inc <- inc_articles[str_detect(string = inc_articles$label, pattern = "^inc"),]
tmp_inc$label <- str_remove_all(string = tmp_inc$label, pattern = "^inc")

write.xlsx2(x = tmp_inc, file = "final included articles.xlsx")

## save all ethical scales
tmp_exc_scales <- tmp_exc[str_detect(string = tmp_exc$label, pattern = "^MixedScales"),]
tmp_inc_scales <- tmp_inc[str_detect(string = tmp_inc$label, pattern = "^MixedScales"),]

write.xlsx2(x = rbind(tmp_inc_scales, tmp_exc_scales), file = "all ethical scales found.xlsx")




articles$authors[articles$label == "incOverview" & !is.na(articles$label)]
articles$year[articles$label == "incOverview" & !is.na(articles$label)]
articles$title[articles$label == "incOverview" & !is.na(articles$label)]

############################################################################
# analysis 1 - simple procedures
############################################################################
################
# create word clouds
################
table(articles$status)
## 2 grams
createWordCloud(nameWordcloud = "WordCloud_Excluded_Ngram2", getStatus = "Excluded",
                minFreqWords = 15, Ngram = 2)
createWordCloud(nameWordcloud = "WordCloud_Included_Ngram2", getStatus = "Included",
                minFreqWords = 5, Ngram = 2)
## 1 grams
createWordCloud(nameWordcloud = "WordCloud_Excluded_Ngram1", getStatus = "Excluded",
                minFreqWords = 15, Ngram = 1)
createWordCloud(nameWordcloud = "WordCloud_Included_Ngram1", getStatus = "Included",
                minFreqWords = 10, Ngram = 1)

### removed word
## 2 grams
createWordCloud(nameWordcloud = "WordCloud_Excluded_Ngram2_RMethical", getStatus = "Excluded",
                minFreqWords = 5, Ngram = 2, removeWord = "ethical")
createWordCloud(nameWordcloud = "WordCloud_Included_Ngram2_RMethical", getStatus = "Included",
                minFreqWords = 5, Ngram = 2, removeWord = "ethical")
## 1 grams
createWordCloud(nameWordcloud = "WordCloud_Excluded_Ngram1_RMethical", getStatus = "Excluded",
                minFreqWords = 15, Ngram = 1, removeWord = "ethical")
createWordCloud(nameWordcloud = "WordCloud_Included_Ngram1_RMethical", getStatus = "Included",
                minFreqWords = 10, Ngram = 1, removeWord = "ethical")

################
# similarity simple
################
## check for exact matches
IDs <- checkSimilarityExactMatches(getStatus = "Included", lowerTri = FALSE, minNchar = 200)
IDs[c(37,40)]


## using phi coefficient to plot correlations between words X abstracts
corsAndPlot <- getWordCorrelations(getStatus = "Included", minWords = 5,
                    plotCors = TRUE,
                    wordsCor = c("technology", "ethical", "scale"))
corsAndPlot
corsAndPlot[[1]] %>%
  filter(item1 == "scale")

## get bigram network
getBigramNetwork(getStatus = "Included", minWords = 3)





############################################################################
# analysis 2 - Latent Dirichlet allocation (LDA)
############################################################################
## copied some lines of codes from:
# https://www.tidytextmining.com/topicmodeling.html
# https://slcladal.github.io/topicmodels.html

################
# data preperation
################
corpus <- tibble(articles[, c("abstract", "status", "key")])
colnames(corpus) <- c("text", "label", "Id")

## remove all articles with abstract of less than 100 characters
sum(nchar(corpus$text) <= 100)
corpus <- corpus[nchar(corpus$text) > 100,]
corpus$text <- tolower(x = corpus$text)
corpus$text <- removeWords(corpus$text, words = stopwords(kind = "en"))
corpus$text <- str_replace_all(corpus$text, " \\s*\\([^\\)]+\\)", "")
corpus$text <- str_replace_all(corpus$text, "[:punct:]", "")
corpus$text <- str_replace_all(corpus$text, "[:digit:]", "")
corpus$text <- str_squish(string = corpus$text)

corpus$text <- stemDocument(corpus$text, language = "english")


corpus$text <- str_replace_all(corpus$text,
                               paste0(" ", freq.df$word[1:30], " ", collapse = "|"), " ")
corpus$text <- str_replace_all(corpus$text,
                               paste0(" ", freq.df$word[freq.df$freq < 10], " ", collapse = "|"), " ")
## resulting text:
corpus$text[1]

# BigramTokenizer <- function(x) NGramTokenizer(x, Weka_control(min = 3, max = 3))
#
# for(i in 1:nrow(corpus)){
#   tmp <- BigramTokenizer(x = corpus$text[i])
#   tmp <- str_replace_all(string = BigramTokenizer(x = tmp), pattern = " ", replacement = "_")
#   corpus$text[i] <- paste0(tmp, collapse = " ")
# }

tm_corpus <- VCorpus(x = VectorSource(corpus$text))



## create DTM with minimum word frequency of 5
minimumFrequency <- 5
DTM <- DocumentTermMatrix(tm_corpus,
                          control = list(bounds = list(global = c(minimumFrequency, Inf))))
# have a look at the number of documents and terms in the matrix
dim(DTM)
inspect(DTM)





################
# find topic number
################
# create models with different number of topics
# result <- ldatuning::FindTopicsNumber(
#   DTM,
#   topics = seq(from = 2, to = 20, by = 1),
#   metrics = c("CaoJuan2009",  "Deveaud2014"),
#   method = "Gibbs",
#   control = list(seed = 77),
#   verbose = TRUE
# )
# ldatuning::FindTopicsNumber_plot(result)




################
# final LDA
################
# number of topics
K <- 3
# set random number generator seed
set.seed(9161)
# compute the LDA model, inference via 1000 iterations of Gibbs sampling
topicModel <- topicmodels::LDA(DTM, K, method="Gibbs", control=list(iter = 500, verbose = 25))


### get Word-topic probabilities -> using the per-topic-per-word probabilities beta
ap_topics <- tidy(topicModel, matrix = "beta")
ap_topics
ap_top_terms <- ap_topics %>%
  group_by(topic) %>%
  slice_max(beta, n = 10) %>%
  ungroup() %>%
  arrange(topic, -beta)

ap_top_terms %>%
  mutate(term = reorder_within(term, beta, topic)) %>%
  ggplot(aes(beta, term, fill = factor(topic))) +
  geom_col(show.legend = FALSE) +
  facet_wrap(~ topic, scales = "free") +
  scale_y_reordered()



### get Document-topic probabilities -> using the per-document-per-topic probabilities gamma
ap_documents <- tidy(topicModel, matrix = "gamma")
ap_documents
ap_documents[ap_documents$gamma > .6,]
ap_documents[ap_documents$document == 1,]
corpus$Id[c(100, 238)]


tidy(DTM) %>%
  filter(document == 100) %>%
  arrange(desc(count))

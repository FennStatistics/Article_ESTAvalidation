# dataset = dat
# listvars = ques_mixed
# notNumeric = vec_notNumeric
questionnairetype <- function(dataset,
                              listvars = ques_mixed,
                              notNumeric = vec_notNumeric){
  
  datasetques <- data.frame(ID = unique(dataset$ID))
  
  for(c in 1:length(listvars)){
    print(c)
    if(any(colnames(dataset) == listvars[c])){
      print(listvars[c])
      ## tmp IDs
      tmpid <- dataset$ID[!is.na(dataset[, listvars[c]])]
      ## tmp value variable
      tmpvalue <- dataset[, listvars[c]][!is.na(dataset[, listvars[c]])]
      datasetques[listvars[c]]  <- NA
      
      if(listvars[c] %in% notNumeric){
        datasetques[datasetques$ID %in% tmpid, listvars[c]] <- tmpvalue
      }else if(is.list(tmpvalue)){
        tmpvalue_tmp <- unique(tmpvalue)
        tmpvalue <- c()
        counter = 1
        for(i in 1:length(tmpvalue_tmp)){
          if(!is.null(tmpvalue_tmp[[i]])){
            tmpvalue[counter] <- paste0(tmpvalue_tmp[[i]], collapse = " - ")
            counter = counter + 1
          }
        }
        datasetques[datasetques$ID %in% tmpid, listvars[c]] <- tmpvalue
      }else{
        datasetques[datasetques$ID %in% tmpid, listvars[c]] <- as.numeric(tmpvalue)
      }
    }
  }
  return(datasetques)
}



cleanUp <- function(charvec) {
  sapply(charvec, function(x) {
    # Remove unwanted characters
    x <- str_replace_all(x, "_|-|:|,|!|;|\\\"|\\*|&|\\?|>|<|=", "")
    x <- str_replace_all(x, "[[:digit:]]", "")
    x <- tolower(x)
    x <- str_remove_all(x, "[.]+|[(]+|[)]+|[/]+")
    
    # Tokenize and remove stopwords
    words <- unlist(str_split(x, "\\s+"))
    words <- words[!words %in% stopwords("en")]
    
    # Reconstruct cleaned sentence and trim whitespace
    cleaned <- paste(words, collapse = " ")
    str_trim(cleaned)
  }, USE.NAMES = FALSE)
}

# Custom similarity function (Jaccard similarity on character sets)
jaccard_sim <- function(a, b) {
  a_set <- unique(strsplit(a, "")[[1]])
  b_set <- unique(strsplit(b, "")[[1]])
  intersect_len <- length(intersect(a_set, b_set))
  union_len <- length(union(a_set, b_set))
  if (union_len == 0) return(0)
  return(intersect_len / union_len)
}
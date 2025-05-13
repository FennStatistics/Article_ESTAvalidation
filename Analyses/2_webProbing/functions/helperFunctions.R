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



cleanUp <- function(charvec = NULL){
  charvec <- str_replace_all(string=charvec, pattern='_|-|:|,|!|;|\\"|\\*|&|\\?|>|<|=', repl="")
  # charvec <- str_replace_all(string=charvec, pattern=" ", repl="")
  charvec <- str_replace_all(string=charvec, pattern="[[:digit:]]", repl="")
  charvec <- tolower(x = charvec)
  ## particularity qdap::wfdf()
  charvec <- str_remove_all(string = charvec, pattern = "[.]+")
  charvec <- str_remove_all(string = charvec, pattern = "[(]+")
  charvec <- str_remove_all(string = charvec, pattern = "[)]+")
  charvec <- str_remove_all(string = charvec, pattern = "[/]+")
  
  return(charvec)
}
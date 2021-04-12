# Code Smell 67 - Middle Man

*Let's break Demeter's Law.*

# Problems

- Unnecessary Indirection

- Empty Classes

- Readability

# Solutions

1. Remove Middle man.

# Sample Code

## Wrong

%[https://gist.github.com/mcsee/8f89b53d0be21a6779e4be53673edf5c]

## Right

%[https://gist.github.com/mcsee/63674fe800fca77d3a7edc39bde428c8]

# Detection

Same as its [opposite smell](https://maximilianocontieri.com/code-smell-08-long-chains-of-collaborations), We can detect this small using parsing trees.

# Tags

- Coupling

- Declarative

- Readability

# Conclusion

This is exactly the opposite to [Message Chain](https://maximilianocontieri.com/code-smell-08-long-chains-of-collaborations). We make explicit the message chain. 

# Relations

%[https://maximilianocontieri.com/code-smell-08-long-chains-of-collaborations]

# More info

%[https://refactoring.guru/smells/middle-man]

%[https://refactoring.com/catalog/removeMiddleMan.html]

%[https://wiki.c2.com/?MiddleMan]

%[https://www.jetbrains.com/help/idea/remove-middleman.html#remove_middleman_example]

%[https://en.wikipedia.org/wiki/Law_of_Demeter]

# Credits

Photo by <a href="https://unsplash.com/@dancounsell">Dan Counsell</a> on <a href="https://unsplash.com/s/photos/robber">Unsplash</a>
  
* * *

> Whenever I have to think to understand what the code is doing, I ask myself if I can refactor the code to make that understanding more immediately apparent.

_Martin Fowler_

* * *
 
%[https://maximilianocontieri.com/software-engineering-great-quotes]

* * *

This article is part of the CodeSmell Series.

%[https://mcsee.hashnode.dev/how-to-find-the-stinky-parts-of-your-code]

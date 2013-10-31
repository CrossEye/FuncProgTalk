Notes for FP Talk
=================

* Definitely reference Steve Yegge's post, [Execution in the Kingdom of 
  Nouns][sy1].  Possibly make verbs-versus-nouns central theme.

* Alternately, focus on OOP as tight coupling between data and operations, FP
  as building functional abstractions from common functions over similar types
  of data.

* Functional: think of results, not steps.  (In fact true of all declarative
  languages.)  Think also of skipping a number of `if` statements, especially
  in pattern-matching languages.

* Important reasons for using FP:

  ** Straightforward unit testing
  ** Easier debugging
  ** Simple concurrency
  ** Elegance and simplicity

* Some features of FP:

  ** First-class functions
  ** Lambdas/Anonymous Functions with closures
  ** Compact, even terse, functions
  ** Mostly stateless processing, side-effect-free function calls
  ** Performant recursion through tail call optimization
  ** Pattern matching (Haskell, Erlang)
  ** Lazy Evaluation (Miranda, Haskell)
  ** Homoiconicity (mostly LISP-like languages?)


* Consider using [Michael Feather's quote][mf1]: 

    OO makes code understandable by encapsulating moving parts.  FP makes code 
    understandable by minimizing moving parts.

* Consider mentioning John Backus' paper [Can Programming Be Liberated From the
  von Neumann Style? A Functional Style and its Algebra of Programs][jb1]

* Consider mentioning John Hugh's paper [Why Functional Programming 
  Matters][jh1]
  
* Comics:
  ** http://imgs.xkcd.com/comics/tabletop_roleplaying.png
  ** http://imgs.xkcd.com/comics/functional.png



  [mf1]: https://twitter.com/mfeathers/status/29581296216
  [sy1]: http://steve-yegge.blogspot.com/2006/03/execution-in-kingdom-of-nouns.html
  [jb1]: http://www.stanford.edu/class/cs242/readings/backus.pdf
  [jh1]: http://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf
//definition

interface Option<A> {
  empty   : boolean;
  map     : <B>(f: (A) => B) => Option<B>;
  flatMap : <B>(f: (A) => Option<B>) => Option<B>;
  ap      : <B>(f: Option<A>) => Option<B>;
  getOrElse: <B>(A) => B;
}

class Some<A> implements Option<A> {
  x: A;
  constructor(x: A) { this.x = x; }
  empty    = false;
  map      = function <B>(f: (A) => B) { return new Some(f(this.x)); };
  flatMap  = function <B>(f: (A) => Option<B>) { return f(this.x); };
  ap       = function <B>(a: Option<A>) { return a.map(this.x); };
  getOrElse = function (x) { return this.x; };
}

class None<A> implements Option<A> {
  empty    = true;
  map      = function <B>(f: (A) => B) { return new None(); };
  flatMap  = function <B>(f: (A) => Option<B>) { return new None(); };
  ap       = function <B>(a: Option<A>) { return new None(); };
  getOrElse = function (x) { return x; };
}

let Maybe = {
	of : x => new Some(x),
	none : new None()
}

//example usage

interface Person {
    title: Option<string>;
	  firstname: string;
    lastname: string;
}

function greeter(person : Person) {
    return "Hello, " + person.title.map(t => t.toUpperCase()).getOrElse('') 
	+ ' ' + person.firstname + " " + person.lastname;
}

var user = {title: Maybe.of("Mr"), firstname: "Jane", lastname: "User"};
var user2 = {title: Maybe.none, firstname: "Terry", lastname: "Henry"};

var array:Person[] = [user, user2]

document.body.innerHTML = array.map(greeter).join('<br>');

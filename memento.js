
var mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
var john = new Person("John Wang", "48th Street", "San Jose", "CA");
var caretaker = new CareTaker();

// save state

caretaker.add(1, mike.hydrate());
caretaker.add(2, john.hydrate());

// mess up their names

mike.name = "King Kong";
john.name = "Superman";

// restore original state

mike.dehydrate(caretaker.get(1));
john.dehydrate(caretaker.get(2));

console.log(mike.name);
console.log(john.name);

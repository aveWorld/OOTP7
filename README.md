Візерунок Memento забезпечує тимчасове зберігання, а також відновлення об'єкта. Механізм, в якому ви зберігаєте стан об'єкта, залежить від необхідної тривалості збереження, яка може змінюватися.

Базу даних можна розглядати як реалізацію шаблону проектування Memento, в якому об'єкти зберігаються і відновлюються. Однак найпоширенішою причиною використання цього шаблону є захоплення знімка стану об'єкта, щоб будь-які наступні зміни можна було легко скасувати, якщо це необхідно.

По суті, Memento - це невелике сховище, яке зберігає стан об'єкта. Сценарії, в яких може знадобитися відновити об'єкт в стан, який існував раніше, включають: збереження і відновлення стану гравця в комп'ютерній грі або реалізація операції скасування в базі даних.

У JavaScript Mementos легко реалізуються шляхом серіалізації та десеріалізації об'єктів за допомогою JSON.

![image](https://user-images.githubusercontent.com/46648541/227900936-d175dd0f-d8f6-4f27-abc3-cf5ba758ddf8.png)


Учасники
#
Об'єктами, що беруть участь в цій закономірності, є:

Оригінатор -- У прикладі коду: Особа
реалізує інтерфейс для створення та відновлення пам'яток самого себе
    -- у прикладі коду: гідрат і зневоднення
об'єкт, стан якого тимчасово зберігається та відновлюється

Memento -- У прикладі коду: JSON представлення особи
внутрішній стан об'єкта Originator в деякому форматі зберігання

CareTaker -- У прикладі коду: CareTaker
відповідальний за зберігання пам'ятних знаків
просто сховище; не вносить зміни в пам'ятні знаки

Код прикладу створює дві особи на ім'я Майк і Джон, створені за допомогою функції конструктора Person. Далі створюються їхні пам'ятні знаки, які підтримуються об'єктом CareTaker.

Ми присвоюємо Майку та Джону фіктивні імена, перш ніж відновити їх із спогадів. Після реставрації ми підтверджуємо, що об'єкти особи повернулися до початкового стану з дійсними іменами.

Сам візерунок Memento з CareTaker тощо. рідко використовується в JavaScript. Однак JSON - це високоефективний формат даних, який надзвичайно корисний у багатьох різних сценаріях обміну даними.

var Person = function (name, street, city, state) {
    this.name = name;
    this.street = street;
    this.city = city;
    this.state = state;
}

Person.prototype = {

    hydrate: function () {
        var memento = JSON.stringify(this);
        return memento;
    },

    dehydrate: function (memento) {
        var m = JSON.parse(memento);
        this.name = m.name;
        this.street = m.street;
        this.city = m.city;
        this.state = m.state;
    }
}

var CareTaker = function () {
    this.mementos = {};

    this.add = function (key, memento) {
        this.mementos[key] = memento;
    },

        this.get = function (key) {
            return this.mementos[key];
        }
}

function run() {

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
}

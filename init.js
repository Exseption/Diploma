const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/webservice');
var Person = sequelize.define('person', {
    login: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.BIGINT
    },
    birthday: {
        type: Sequelize.DATE
    },
    registrated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    rating: {
        type: Sequelize.DOUBLE
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    usergroup: {
        type:Sequelize.ENUM('admin','user'),
        defaultValue: 'user'
    },
    country: {
        type: Sequelize.STRING
    },
    area: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    }
});

var Book = sequelize.define('book', {
    title: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    },
    path: {
        type: Sequelize.STRING
    }
});

var Question = sequelize.define('question', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },
    // author: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: Person,
    //         key: 'id'
    //     }
    // },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    payable: {
        type: Sequelize.BOOLEAN
    },
    price: Sequelize.DOUBLE,
    closed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Person.hasMany(Question);
Question.belongsTo(Person);

var Dialog = sequelize.define('dialog', {
    sender: {
        type: Sequelize.INTEGER,
        references: {
            model: Person,
            key: 'id'
        }
    },
    destination: {
        type: Sequelize.INTEGER,
        references: {
            model: Person,
            key: 'id'
        }
    },
    caption: {
        type: Sequelize.STRING
    },
    started: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

var Message = sequelize.define('message', {
    body: {
        type: Sequelize.STRING
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    dialog: {
        type: Sequelize.INTEGER,
        references: {
            model: Dialog,
            key: 'id'
        }
    },
    sended_by: {
        type: Sequelize.INTEGER,
        references: {
            model: Person,
            key: 'id'
        }
    }
});


var Answer = sequelize.define('answer', {
    body: {
        type: Sequelize.STRING
    },
    question: {
        type: Sequelize.INTEGER,
        references: {
            model: Question,
            key: 'id'
        }
    },
    mark: {
        type: Sequelize.DOUBLE
    },
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: Person,
            key: 'id'
        }
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

var Attachment = sequelize.define('attachment', {
    path: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.INTEGER,
        references: {
            model: Message,
            key: 'id'
        }
    }
});

sequelize.drop();

sequelize.sync(
    {force:true}
    )
    .then(function () {
//заполним данными

    Person.create({
        login: 'admin',
        password: 'qwerty',
        name: 'Игорь',
        surname: 'Налимов',
        telephone: '89248427178',
        birthday: '1990-01-26',
        country: 'Россия',
        area: 'Амурская',
        city: 'Благовещенск'
    });
    Person.create({
        login:'user',
        password: 'qwerty',
        name: 'Иван',
        surname:'Иванов',
        telephone: '89244563467',
        birthday: '1996-03-11',
        country: 'Россия',
        area: 'Амурская',
        city: 'Благовещенск'
    });
        Person.create({
            login:'user1',
            password: 'qwerty',
            name: 'Алексей',
            surname:'Смирнов',
            telephone: '89147363467',
            birthday: '1978-08-08',
            country: 'Россия',
            area: 'Амурская',
            city: 'Райчихинск'
        });
        Person.create({
            login:'user2',
            password: 'qwerty',
            name: 'Владимир',
            surname:'Петров',
            telephone: '89244509866',
            birthday: '1988-12-01',
            country: 'Россия',
            area: 'Хабаровский',
            city: 'Хабаровск'
        });

        Question.create({
            title:'Помогите отсудить деньги за митинг',
            body:'Как это сделать?',
            personId: 1,
            payable: false
        });
        Question.create({
            title:'Как составить договор дарственной на квартиру',
            body:'Как это сделать?',
            personId: 2,
            payable: false
        });
        Question.create({
            title:'Как оформить доверенность на машину?',
            body:'Как это сделать?',
            personId: 2,
            payable: false
        });
        Question.create({
            title:'Как откосить от армии?',
            body:'Как это сделать?',
            personId: 3,
            payable: false
        });
        Question.create({
            title:'Помогите отсудить деньги за митинг',
            body:'Как это сделать?',
            personId: 3,
            payable: false
        });
        Question.create({
            title:'Как развестить без согласия жены?',
            body:'Как это сделать?',
            personId: 3,
            payable: false
        });
        Question.create({
            title:'Помогите отсудить деньги за митинг',
            body:'Как это сделать?',
            personId: 4,
            payable: false
        });

        Answer.create({
           body:'Поступай как знаешь',
            question: 1,
            author: 2
        });

        Answer.create({
            body:'Я не знаю',
            question: 2,
            author: 1
        });
        Answer.create({
            body:'Ну, тут без литра не обойтись',
            question: 2,
            author: 3
        });

        Answer.create({
            body:'Я бы о таком не стал спрашивать)',
            question: 3,
            author: 1
        });
        Answer.create({
            body:'Не тут спрашивай!',
            question: 3,
            author: 2
        });
        Answer.create({
            body:'Никто не знает, и тебе не советую',
            question: 4,
            author: 1
        });

        Answer.create({
            body:'Где-то я про это читал...',
            question: 4,
            author: 2
        });

        Dialog.create({
            sender: 1,
            destination: 2
        });
        Dialog.create({
            sender: 1,
            destination: 3
        });
        Dialog.create({
            sender: 2,
            destination: 3
        });
        Message.create({
           body:'Здравствуйте! Я на счет вашего вопроса!',
            dialog: 1,
            sended_by: 1
        });
        Message.create({
            body:'Здравствуйте! Да, хорошо',
            dialog: 1,
            sended_by: 2
        });
        Message.create({
            body:'Тут необходимо оформить ряд документов',
            dialog: 1,
            sended_by: 1
        });
        Message.create({
            body:'Да? Каких именно?',
            dialog: 1,
            sended_by: 2
        });
        Message.create({
            body:'Здравствуйте!',
            dialog: 2,
            sended_by: 1
        });
        Message.create({
            body:'Здравствуйте!',
            dialog: 2,
            sended_by: 3
        });
        Message.create({
            body:'Здравствуйте!',
            dialog: 3,
            sended_by: 3
        });

}) ;
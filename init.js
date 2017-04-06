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
        type: Sequelize.BOOLEAN
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
    started: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
    }
});
sequelize.sync({force:true}) ;
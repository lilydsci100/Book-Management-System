const express = require("express");
// const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
// const { param } = require("jquery");
// const uuid = require('uuid')
const app = express();
// const _ = require('lodash')

app.use('/public/', express.static('./public'))
app.use('/', express.static('./'))

let books = {
    "message": "查询图书列表成功",
    "data": [
        {
            "id": 433569,
            "bookname": "西游记",
            "author": "吴承恩",
            "publisher": "人民文学出版社",
            "type": "文学",
            "total": 10
        },
        {
            "id": 433568,
            "bookname": "三国演义",
            "author": "罗贯中",
            "publisher": "人民文学出版社",
            "type": "文学",
            "total": 12
        },
        {
            "id": 433567,
            "bookname": "水浒传",
            "author": "施耐庵",
            "publisher": "人民文学出版社",
            "type": "文学",
            "total": 13
        },
        {
            "id": 158934,
            "bookname": "数据结构",
            "author": "殷人昆",
            "publisher": "清华大学出版社",
            "type": "计算机",
            "total": 13
        },
        {
            "id": 158935,
            "bookname": "操作系统",
            "author": "孟庆昌",
            "publisher": "电子工业出版社出版",
            "type": "计算机",
            "total": 1
        },
        {
            "id": 239674,
            "bookname": "临床病理诊断与鉴别诊断",
            "author": "丛文铭",
            "publisher": "人民卫生出版社出版",
            "type": "医学",
            "total": 9
        },
        {
            "id": 239675,
            "bookname": "实用疼痛治疗技术手册",
            "author": "谢平",
            "publisher": "人民卫生出版社出版",
            "type": "医学",
            "total": 7
        },
        {
            "id": 397591,
            "bookname": "理想国",
            "author": "朱光潜",
            "publisher": "研究出版社",
            "type": "哲学",
            "total": 2
        },
        {
            "id": 397592,
            "bookname": "逻辑学入门",
            "author": "格桑",
            "publisher": "中国科学研究院出版社",
            "type": "哲学",
            "total": 2
        }
    ]
}

app.use(cors({
    origin: '*'
}));



app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(express.json());



// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
// });

// app.get("/search", cors(), (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'search.html'));
// });

// app.post("/echo", cors(), (req, res) => {
//     res.send(result);
//     console.log(req.body);
// });

// app.post("/insert", cors(), (req, res) => {
//     res.send('ok')
//     console.log(req.body);
// });

// app.get("/insert", cors(), (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'add.html'));
// });

// app.get('/delete', cors(), (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'delete.html'));
// })

// app.post('/delete', cors(), (req, res) => {
//     res.send(result)
//     console.log(req.body)
// })
// app.post('/getTableData', cors(), (req, res) => {
//     res.send(result)
//     console.log(req.body)
// })
//获取图书列表
app.get('/books', cors(), (req, res) => {
    res.send(books)
})


//添加图书
app.post('/req', cors(), (req, res) => {
    // 生成一个随机的6位数作为添加图书的id
    const id = Math.floor(100000 + Math.random() * 900000);
    const { bookname, type, publisher, author, total } = req.query;
    const newbook = {
        "id": id,
        "bookname": bookname,//用req.body.bookname替代--c语言
        "author": author,//用req.body.author替代author
        "publisher": publisher,//用req.body.publisher替代-publisher
        "type": type,//用req.body.type替代--type
        "total": total//用req.body.total替代--total

    }
    if (!books.data.some((item) => {
        return item.bookname === bookname &&
            item.author === author &&
            item.publisher === publisher &&
            item.type === type
    })) {
        books.data.push(newbook)
    }

    res.send({
        msg: '添加图书成功'
    })
})

//更新图书
app.put('/edit', cors(), (req, res) => {
    const {id, object} = req.body;
    const { bookname, type, publisher, author, total } = object
    const bid = parseInt(id)
    const idindex = books.data.findIndex(item => {
        return item.id === bid
    })
    books.data[idindex].bookname = bookname
    books.data[idindex].author = author
    books.data[idindex].publisher = publisher
    books.data[idindex].type = type
    books.data[idindex].total = total
    res.send({
        msg: '更新数据成功！',
        data: books.data[idindex]
    })
})


//查找图书
app.get('/search', cors(), (req, res) => {
    const { bookname, type, publisher } = req.query;

    const rs = books.data.filter((item) => {
        if (bookname && type && publisher) {
            return item.bookname === bookname && item.type === type && item.publisher === publisher
        } else {
            return item.bookname === bookname || item.type === type || item.publisher === publisher
        }
        
    })
    if (rs) {
        return res.send({
            msg: '查找成功！',
            data: rs
        })
    }
    res.send({
        msg: '查找失败！'
    })

})

//根据id得到具体数据
app.get('/books/:id', cors(), (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = books.data.find (item => {
        return item.id === id
    })

    res.send({
        msg: '查询结果',
        data: result
    });
})



//删除图书
app.delete('/delete', cors(), (req, res) => {
    const { list, object } = req.body;
    const idindex1 = list.findIndex(item => item.id === object.id);
    const idindexBook = books.data.findIndex(item => item.id === object.id);
    list.splice(idindex1, 1);
    books.data.splice(idindexBook,1)
    res.send({
        msg: '删除成功！',
        data: list
    });
});

const PORT = 8888;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});

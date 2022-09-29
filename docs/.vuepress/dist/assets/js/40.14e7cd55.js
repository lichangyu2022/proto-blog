(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{523:function(e,n,s){"use strict";s.r(n);var a=s(31),t=Object(a.a)({},(function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"mysql连接查询和子查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mysql连接查询和子查询"}},[e._v("#")]),e._v(" MySQL连接查询和子查询")]),e._v(" "),s("h2",{attrs:{id:"准备演示数据"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#准备演示数据"}},[e._v("#")]),e._v(" 准备演示数据")]),e._v(" "),s("p",[e._v("做一个比较经典的案例，部门和员工。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("drop table if exists department;\ncreate table department(\n  id int not null AUTO_INCREMENT PRIMARY KEY ,\n  name varchar(55) CHARACTER SET utf8 not null default '' comment '名称'\n) comment '部门表';\n\ndrop table if exists employee;\ncreate table employee(\n  id int not null AUTO_INCREMENT PRIMARY KEY ,\n  name varchar(55) CHARACTER SET utf8 not null default '' comment '员工名称',\n  d_id int not null default 0 comment '部门id'\n) comment '员工表';\n\ninsert into department values (1,'开发'),(2,'产品'),(3,'运维'),(4,'运营');\ninsert into employee values (1,'赵',1),(2,'钱',2),(3,'孙',2),(4,'李',0),(5,'周',0);\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br")])]),s("h2",{attrs:{id:"连接查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#连接查询"}},[e._v("#")]),e._v(" 连接查询")]),e._v(" "),s("p",[s("strong",[e._v("需要使用多张表来查询数据的时候，可以使用连接查询")]),e._v("\n连接查询主要分为，"),s("strong",[e._v("内链接和外连接，外连接主要包括左连接和右连接")]),e._v("，至于区别在后面演示的时候就可以看到")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://blog.csdn.net/qq_43688472/article/details/85641867",target:"_blank",rel:"noopener noreferrer"}},[e._v("先了解下笛卡尔积"),s("OutboundLink")],1)]),e._v(" "),s("ol",[s("li",[e._v("内连接")])]),e._v(" "),s("p",[e._v("内连接主要使用 inner join关键字实现")]),e._v(" "),s("p",[e._v("先拿上面部门和员工表做个演示")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v(" select e.name,d.name from employee e inner join department d on e.d_id = d.id;\n #通过员工表的did和部门id作为查询条件，来获取两个表的交集。\n #如果使用连接条件，[on e.d_id = d.id]; 直接用inner join 会查询什么结果。希望大家动手试一下\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("p",[e._v("多条件的组合查询使用")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("select e.name,d.name from employee e , department d where  e.d_id = d.id and d.name like '%开发%';\n# 直接使用where 在后面过滤。比较推荐使用\n\nselect e.name,d.name from employee e inner join department d on  e.d_id = d.id where d.name like '%开发%';\n# 相当于有了连接查询的结果，然后再使用where 进行过滤\n\nselect e.name,d.name from employee e inner join department d on  e.d_id = d.id and d.name like '%开发%';\n# 在链接条件中使用了组合查询条件\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br")])]),s("ol",{attrs:{start:"2"}},[s("li",[e._v("左外连接")])]),e._v(" "),s("p",[e._v("左外连接主要使用 left join关键字实现,left 左边的表就是主表。\n一会可以重点观察下，left 和 inner 同样的查询条件下，两者的数据有什么区别")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("select e.name,d.name from employee e left join department d on e.d_id = d.id;\n# 和inner 一样的查询条件，但是使用left查询出的数据似乎多了些。\n# 可以发现left会把主表有的数据，但是没有连接结果的数据也显示出来，那么右外连接也是这样吗？\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("p",[e._v("如果我想要用left实现和inner一查的查询结果该怎么弄？"),s("strong",[e._v("where ?")])]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("select e.name,d.name from employee e left join department d on e.d_id = d.id where d.name is not null;\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("ol",{attrs:{start:"3"}},[s("li",[e._v("右外连接")])]),e._v(" "),s("p",[e._v("其实写完左外连接之后我就不想写右外连接了，反正都是一样的，把left换成right就行了。无非就是谁是主表的区别，出于这样可能对新手不太友好，再加上我有a little 敬业精神，还是简单描述下吧。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("select e.name,d.name from department d left join employee e on e.d_id = d.id;\n# 结果可以自己看一下，无非就是谁是主表的区别，那要是也想实现inner的效果呢。和上面一样，加where 然后把条件换一下。\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("h2",{attrs:{id:"子查询"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#子查询"}},[e._v("#")]),e._v(" 子查询")]),e._v(" "),s("p",[e._v("子查询可以理解为是在主查询之前执行一次查询，简单点说就是 select 语句中 又出现了select。")]),e._v(" "),s("p",[e._v("子查询可以按照行列数大致分为下面这几种：")]),e._v(" "),s("ul",[s("li",[e._v("标量子查询，结果集只有一行一列")]),e._v(" "),s("li",[e._v("列子查询，结果集里面有多行一列")]),e._v(" "),s("li",[e._v("行子查询，结果集里面有一行多列")]),e._v(" "),s("li",[e._v("表子查询，结果集里面有多行多列")])]),e._v(" "),s("p",[s("strong",[e._v("抽空再写")])])])}),[],!1,null,null,null);n.default=t.exports}}]);
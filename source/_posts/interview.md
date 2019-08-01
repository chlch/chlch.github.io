title: 面试系列
date: 2019-03-20 23:17:21
tags: [面试]
category: 面试
description: 面试
---

# Java基础
### 1. Java基本数据类型，多少字节
字符型 char(16)
逻辑型 boolean(8)
整型 byte(8) short(16) int(32) long(64)
浮点型 float(32) double(64)
### 2.String类能被继承吗？为什么？
不能，String 被final修饰，被final修饰的类不能被继承，实现细节不允许改变。
### 3.String， StringBuffer， StringBuilder 区别
String不可变对象，因此在每次对String类型进行改变的时候其实都等同于生成了一个新的 String 对象，然后将指针指向新的 String 对象
StringBuffer线程安全
StringBuilder线程不安全
String对象拼接实质就是StringBuffer append，仅在连加情况下快
### 4.ArrayList和LinkedList有什么区别
ArrayList是基于动态数组的数据结构，LinkedList是基于链表的数据结构
对于查找get和set操作，ArrayList优于LinkedList
对于新增和删除操作add和remove，LinedList比较占优势，因为ArrayList要移动数据。
### 5.类的实例化顺序
父类static -> 子类static -> 父类动态代码块构造函数 -> 子类动态代码块构造函数
### 6.ConcurrentHashMap为什么放弃了分段锁,有什么问题吗？
为了减小锁的粒度，直接锁住链表头结点，CAS+synchronized控制并发，提高了性能，分段锁并发度低，性能上差点。
### 7.有顺序的Map实现类，如果有，他们是怎么保证有序的。
TreeMap：根据元素key排序，可自定义比较器
LinkedHashMap：根据元素存入顺序保证有序，内部增加了个链表存放元素顺序
### 8.抽象类和接口区别
抽象类可以有默认的方法实现，接口完全抽象不存在方法实现，jdk1.8接口可以有default实现 
抽象类子类用extends关键字，接口子类使用implements关键字
抽象类可以有构造器，接口不存在构造器
抽象类除了不能实例化和普通类没区别，接口是完全不同的类型
抽象方法可以有public、protected和default这些修饰符，接口方法默认修饰符是public。你不可以使用其它修饰符。
抽象方法可以有main方法并且我们可以运行它，接口没有main方法，因此我们不能运行它。
如果你往抽象类中添加新的方法，你可以给它提供默认的实现。因此你不需要改变你现在的代码。如果你往接口中添加方法，那么你必须改变实现该接口的类。
### 9.IO模型有哪些，讲讲你理解的nio ，他和bio，aio的区别是啥，谈谈reactor模型
四种I/O模型，同步阻塞，同步非阻塞，多路复用，异步阻塞。
nio非阻塞 bio、aio阻塞
Reactor 将I/O事件发派给对应的Handler
Acceptor 处理客户端连接请求
Handlers 执行非阻塞读/写
### 10.反射的原理，反射创建类实例的三种方式是什么。
在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法
Class clz = Class.forName("java.lang.String");
Class clz = String.class;
String str = new String("Hello");
Class clz = str.getClass();
### 11.反射中，Class.forName和ClassLoader区别 。
class.forName()前者除了将类的.class文件加载到jvm中之外，还会对类进行解释，执行类中的static块。
而classLoader只干一件事情，就是将.class文件加载到jvm中，不会执行static中的内容,只有在newInstance才会去执行static块。
Class.forName(name, initialize, loader)带参函数也可控制是否加载static块。并且只有调用了newInstance()方法采用调用构造函数，创建类的对象
### 12.描述动态代理的几种实现方式，分别说出相应的优缺点。
jdk动态代理 ： 目标类必须实现的某个接口，如果某个类没有实现接口则不能生成代理对象。
cglib动态代理：针对目标类生成一个子类，覆盖其中的所有方法，所以目标类和方法不能声明为final类型。
CGLib采用了ASM的字节码技术，其原理是通过字节码技术为一个类创建子类

### 13.如何在父类中为子类自动完成所有的hashcode和equals实现？这么做有何优劣。
在父类中同时改写equals方法与hashCode方法；
在子类中改写equals方法，保证子类对象可以与父类对象进行比较；
子类中不改写hashCode方法，直接继承父类中改写的hashCode方法。
同时复写hashcode和equals方法，优势可以添加自定义逻辑，且不必调用超类的实现。

### 14.深拷贝和浅拷贝区别。
浅拷贝，复制了主对象，里面成员变量共享，
深拷贝，完全复制，除了不可变对象不复制
### 15.在 jdk1.5 中，引入了泛型，泛型的存在是用来解决什么问题。
泛型的本质是参数化类型，也就是说所操作的数据类型被指定为一个参数，泛型的好处是在编译的时候检查类型安全，并且所有的强制转换都是自动和隐式的，以提高代码的重用率
### 16.什么是序列化，怎么序列化，为什么序列化，反序列化会遇到什么问题，如何解决。
序列化 (Serialization)是将对象的状态信息转换为可以存储或传输的形式的过程。在网络传输过程中，可以是字节或是XML等格式。而字节的或XML编码格式可以还原完全相等的对象。这个相反的过程又称为反序列化。
实现java.io.Serializable || java.io.Externalizable 接口
在真实的应用场景中，我们需要将这些对象持久化下来，并且能够在需要的时候把对象重新读取出来。Java的对象序列化可以帮助我们实现该功能。
类里面一定要serialVersionUID，否则旧数据会反序列化会失败。serialVersionUID是根据该类名、方法名等数据生产的一个整数，用来验证版本是否一致。

### 17什么情况下会发生栈内存溢出
如果线程请求的栈深度大于虚拟机所允许的深度，将抛出StackOverflowError异常。
如果虚拟机在动态扩展栈时无法申请到足够的内存空间，则抛出OutOfMemoryError异常。

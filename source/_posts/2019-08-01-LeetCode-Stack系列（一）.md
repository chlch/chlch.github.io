---
title: LeetCode Stack系列（一）
toc: true
date: 2019-08-01 10:47:31
tags: [LeetCode,Stack,algorithm]
category: LeetCode
description: Leetcode Stack 71/921/150/402
---

### 71. Simplify Path
题目大意是给定一个unix下的绝对路径，然后要求简化成标准路径格式。
Example 1:
Input: "/home/"
Output: "/home"
Explanation: 最后一个路径后面没有"/"

Example 2:
Input: "/../"
Output: "/"
Explanation: root路径只有"/"

Example 3:
Input: "/home//foo/"
Output: "/home/foo"

Example 4:
Input: "/a/./b/../../c/"
Output: "/c"

既然是用栈这种数据结构，那么很明显入栈的应该是路径名，"/"用来分割给定的路径字符串。既然确定了入栈的是路径名，那么什么时候出栈，用"/"分割字符串后剩下的只有路径名、""空串、"."、".."这四种情况，因为碰到".."是像上一级，所以应该这时候出栈了。

```Java Solution https://leetcode.com/problems/simplify-path/ Simplify Path
class Solution {
    public String simplifyPath(String path) {
        Deque<String> stack = new ArrayDeque<>(); // Java推荐用ArrayDeque用作Stack
        String[] arr = path.split("/");
        for(String s: arr) {
            if(".".equals(s) || "".equals(s)) {
                continue;
            } else if ("..".equals(s)) {
                if(!stack.isEmpty()) {
                      stack.pop();
                }
            } else {
                stack.push(s);
            }
        }
        if(stack.isEmpty()) {
            return "/";
        }
        StringBuilder sb = new StringBuilder();               
        while(!stack.isEmpty()) {                         //Stack在这里用for遍历从底部开始，而ArrayDeque是从顶部开始
            sb.append("/").append(stack.pollLast());      //ArrayDeque是个双端队列，所以底部移除拼接
        }
        return sb.toString();
    }
}
```
### 921. Minimum Add to Make Parentheses Valid
题目大意是给定一个只包含"("、 ")"的字符串，然后判断需要插入几个括号使得他有效（完美闭合），每一个左括号都有一个右括号与之对应。
Example 1:
Input: "())"
Output: 1

Example 2:
Input: "((("
Output: 3

Example 3:
Input: "()"
Output: 0

Example 4:
Input: "()))(("
Output: 4

思路还是找到入栈出栈的时机，这里入栈的元素既可以是"("又可以是")"，每次新加入的括号只要不和栈顶的括号相等并且不是"("，那么就有一个配对成功出栈，栈里剩的都是缺失的括号，统计即可得出答案。
```Java Solution https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/  Minimum Add to Make Parentheses Valid
class Solution {
    public int minAddToMakeValid(String S) {
        Deque<Character> stack = new ArrayDeque<>();
        char[] arr = S.toCharArray();
        for(char c : arr) {
            if(!stack.isEmpty() && stack.peek() != c && c != '(') {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        return stack.size();
    }
}
```
### 150. Evaluate Reverse Polish Notation
题目大意是给定一个字符串数组，里面包含数字和操作符，每次按照给定的操作符计算前面两个数，最终输出最后结果，题目保证了有结果并且除数不会为0。
这里面入栈的元素就是数字，碰到操作符就出栈两个数，计算完成后还得再入栈。这里面如果用变量保存结果而不把结果入栈就不符合题目给定的先后运算关系了。
```Java Solution https://leetcode.com/problems/evaluate-reverse-polish-notation/  Evaluate Reverse Polish Notation
class Solution {
    public int evalRPN(String[] tokens) {
         Deque<Integer> stack = new ArrayDeque<>();
        int res = 0;
        int a,b;
        boolean flag = true;
        for (String s :tokens) {
           if("+".equals(s)) {
                b = stack.pop();
                a = stack.pop();
                stack.push(a+b);
            } else if("-".equals(s)) {
                b = stack.pop();
                a = stack.pop();
                stack.push(a-b);
            } else if("*".equals(s)) {
                b = stack.pop();
                a = stack.pop();
                stack.push(a*b);
            } else if ("/".equals(s)) {
                b = stack.pop();
                a = stack.pop();
                stack.push(a/b);
            } else {
                stack.push(Integer.valueOf(s));
            }
        }
        return stack.peek();
    }
}
```
### 402. Remove K Digits
题目大意是给定一个数字字符串和一个整数k，要求从这个字符串中移除k个数字字符后使得新的字符串表示的数字最小。不能以0开头，并且新的字符串为空时用0表示。
Example 1:
Input: num = "1432219", k = 3
Output: "1219"

Example 2:
Input: num = "10200", k = 1
Output: "200"

Example 3:
Input: num = "10", k = 2
Output: "0"

既然要想组成最小数字，理论上就是高位越小越好，那么从头开始遍历把数字压入栈中，只要出现比栈顶小的数字那么栈顶数字移除继续和下一个栈顶数字比较，这里每出一次栈都要减小一次k，有可能还没遍历完k为0，也有可能遍历完k还不为0，当k不0时，只要继续栈顶移除就好了，因为在入栈时我们就保证了从小到大的顺序，最终只要从栈底部开始拼接输出就好了。注意剔除掉0开头的字符。
```Java Solution https://leetcode.com/problems/remove-k-digits/  Remove K Digits
class Solution {
    public String removeKdigits(String num, int k) {
        Deque<Character> stack = new ArrayDeque<>();
        char[] arr = num.toCharArray();
        for (char c : arr) {
            while(!stack.isEmpty() && k != 0 && stack.peek() > c) {  //出栈的时机
                stack.pop();
                k--;
            }
            stack.push(c);
        }
        while (k!=0) {
            stack.pop();
            k--;
        }
        StringBuilder sb = new StringBuilder();
        while (!stack.isEmpty()) {
            sb.append(stack.pollLast());
        }
        String a = sb.toString().replaceAll("^(0+)", "");
        return a.isEmpty() ? "0" : a;
    }
}
```
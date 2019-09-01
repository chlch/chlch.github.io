---
title: LeetCode HashTable系列（二）
toc: true
date: 2019-07-15 15:25:49
tags: [LeetCode,HashTable,algorithm]
category: LeetCode
description: LeetCode HashTable 739/290
---

### 739. Daily Temperatures
题目大意给定一个整数数组表示温度，找出比当前温度高的日子最近需要几天，结果用数组表示，如果没有这样的一天，结果用0表示。例如T = [73, 74, 75, 71, 69, 72, 76, 73]，那么结果就是[1, 1, 4, 2, 1, 1, 0, 0]。其实就是找到比当前数字大的出现的第一个数字，求他们的距离。
第一想到暴力解法试试，能过，但是耗时两百多ms。
#### 暴力解法
```Java Solution https://leetcode.com/problems/daily-temperatures/ Daily Temperatures
class Solution {
    public int[] dailyTemperatures(int[] T) {
        int len = T.length;
        int[] res = new int[len];
        for(int i=0; i<len; i++) {
            int cnt = 0;
            for(int j= i; j<len; j++) {              
                if(T[i] < T[j]) {
                    res[i] = cnt;
                    break;
                } else {
                    cnt++;
                }
            }
        }
        return res;
    }
}
```
#### 栈
这种解法利用了栈的思想，这个栈记录的是每个放入值的下标（索引），并且最底部是最大的，依次往上递减，我们从头开始遍历数组，依次放入栈中，在每一次放之前，用当前的值和栈顶索引对应的值比较，如果比栈顶对应的值大，那么就知道了栈顶索引对应的最近距离较大的值是哪个，计入结果数组，同时移除，继续当前值和新的栈顶的值比较。（总觉得应该把这题归在Stack下）
```Java Solution https://leetcode.com/problems/daily-temperatures/ Daily Temperatures
class Solution {
    public int[] dailyTemperatures(int[] T) {
        int[] stack = new int[T.length];
        int top = -1;
        int[] ret = new int[T.length];
        for(int i = 0; i < T.length; i++) {   
            while(top > -1 && T[i] > T[stack[top]]) {
                int idx = stack[top--];
                ret[idx] = i - idx; 
            }
            stack[++top] = i;
        }
        return ret;
    }
}
```

### 290. Word Pattern
题目大意给定几个单词组成的一个字符串，再给一个字符串代表几个单词的模式，问这几个单词是否匹配该模式。
Example 1:

Input: pattern = "abba", str = "dog cat cat dog"
Output: true
Example 2:

Input:pattern = "abba", str = "dog cat cat fish"
Output: false

第一反应就是用map把单词和模式的字母做好一一映射的关系，然后就是逻辑判断了，如果包含key那么value不等说明不匹配，如果不包含key那么又存在value说明也不匹配，还有一种就是单词数和模式字符串长度不等也不匹配。

```Java Solution https://leetcode.com/problems/word-pattern/ Word Pattern
class Solution {
    public boolean wordPattern(String pattern, String str) {
        String[] s = str.split(" ");
        Map<String, String> map = new HashMap<>();
        if(s.length != pattern.length()) {
            return false;
        }
        for(int i=0; i<s.length; i++) {
            String key = String.valueOf(pattern.charAt(i));
            String value  = s[i];
            if(map.containsKey(key)) {
               if(!map.get(key).equals(value)) {
                 return false;
               }
            } else {
                if(map.containsValue(value)) {
                    return false;
                }
                map.put(key, value);
            }
        }
        return true;  

    }
}
```

### 387. First Unique Character in a String
题目大意是找到给定字符串中第一次出现且不重复的字母的索引。
Examples:

s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
#### 1.beat 100%解
先贴一个beat 100%的答案，写的十分精简，简直完美。
```Java Solution https://leetcode.com/problems/first-unique-character-in-a-string/  First Unique Character in a String
class Solution {
    public int firstUniqChar(String s) {
        int len = s.length();
        int lowest = len;
        for (char i = 'a'; i <= 'z' ; i++) {
            int first = s.indexOf(i);
            if (first >= 0) {
                if (lowest > first && s.lastIndexOf(i) == first)  //仅出现一次，并且靠前
                    lowest = first;
            }
        }
        return lowest == len ? -1 :lowest;
    }
}

```
#### 2.Map
第二种自然是想到HashMap，官方给出的也是这种解，利用Map存储统计次数，但是Java中HashMap是无排序的，如果用LinkedHashMap就能根据放入先后顺序排了。
```Java Solution https://leetcode.com/problems/first-unique-character-in-a-string/  First Unique Character in a String
class Solution {
    public int firstUniqChar(String s) {
        int len = s.length();
        Map<Character, Integer> map = new LinkedHashMap<>();
        for(int i=0; i<len; i++) {
            char key = s.charAt(i);
            map.put(key, map.getOrDefault(key, 0) + 1);
        }
        
        Optional<Entry<Character, Integer>> res = map.entrySet().stream()
        .filter(x -> x.getValue() == 1).findFirst();
        if(res.isPresent()) {
            return s.indexOf(res.get().getKey());
        } else {
            return -1;
        }
    }
}

```
#### 3.数组
第三种就是利用数组统计。
```Java Solution https://leetcode.com/problems/first-unique-character-in-a-string/  First Unique Character in a String
class Solution {
    public int firstUniqChar(String s) {
        int[] nums = new int[26];
        int len = s.length();
        for(int i=0; i<len; i++) {
            int k = (int)(s.charAt(i) - 'a');
            nums[k]++;
        }
        for(int i=0; i<len; i++) {
           if(nums[(int)(s.charAt(i) - 'a')] == 1){
               return i;
           }
        }
        return -1;
    }
}

```
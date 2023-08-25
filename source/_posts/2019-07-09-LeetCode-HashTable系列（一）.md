---
title: LeetCode HashTable系列（一）
tags:
  - LeetCode
  - HashTable
  - algorithm
category: LeetCode
description: Leetcode HashTable 1002/500/884
toc: true
abbrlink: 2663958312
date: 2019-07-09 10:08:10
---

### 1002.Find Common Characters
题目大意是给定一个字符串数组，找出每个字符串公共的字母，包括重复的，比如一个字母在每个字符串里重复了3次，那么最后也输出3次。

1.Example 1:
Input: ["bella","label","roller"]
Output: ["e","l","l"]

2.Example 2:
Input: ["cool","lock","cook"]
Output: ["c","o"]

{% codeblock "Solution" lang:Java https://leetcode.com/problems/find-common-characters/ "Find Common Characters" %}
class Solution {
    public List<String> commonChars(String[] A) {
        int Alen = A.length;
        List<String> res = new ArrayList<>();
        int[] nums = new int[26];
        Arrays.fill(nums, Integer.MAX_VALUE);
        for(int i=0; i<Alen; i++) {
            String s = A[i];
            int[] temp = new int[26];
            for(int j=0; j<s.length(); j++) {
                temp[s.charAt(j) - 'a']++;
            }
            for(int k=0; k<26; k++) {
                nums[k] = Math.min(nums[k], temp[k]);  //记录出现次数最少的
            }
        }
        for(int i=0; i<26; i++) {
            while(nums[i]-- > 0) {
                res.add(String.valueOf((char)(i + 97)));
            }
        }
        return res;
    }
}
{% endcodeblock %}

这题目一开始想到是用数组去记录26个字母出现次数的，但是在重复的地方比较容易出错，比如说在一个字符串中重复了多次，但是其他字符串没有，后来看了一个discuss，才意识到需要额外一个数组来记录单个字符串字母出现的次数，通过这个数组和最终计数的数组比较取最小值，来统计出实际重复的次数。既然每个都要重复，那么最终肯定最少是一次，没出现过就是零次。

### 500. Keyboard Row
题目大意是给定一个字符串数组，判断每个字符串字母是否是由键盘上同一行的字母组成，输出符合条件的字符串。假定只用到键盘每一行的字母，以及字母可以重复。
我的思路就是键盘上三行分成三组，拿每一个字符串每个字母去比较，一旦出现字母不在同一行那就排除。最终运行时间0ms挺让我惊讶的。
{% codeblock "Solution" lang:Java https://leetcode.com/problems/keyboard-row/ " Keyboard Row" %}
class Solution {
    public String[] findWords(String[] words) {
        String row1 = "qwertyuiop";
        String row2 = "asdfghjkl";
        String row3 = "zxcvbnm";
        List<String> res = new ArrayList<>();
        for(int i=0; i<words.length; i++) {
            String s = words[i];
            String lowerS = s.toLowerCase();
            int row = 0;
            for(int j=0; j<lowerS.length(); j++) {
                if(row1.indexOf(lowerS.charAt(j)) > -1) {
                    if(j == 0) {
                        row = 1;
                    } else if(row != 1) {
                        row = 0;
                        break;
                    }
                } else if(row2.indexOf(lowerS.charAt(j)) > -1) {
                     if(j == 0) {
                        row = 2;
                     } else if(row != 2) {
                        row = 0;
                        break;
                    }
                } else {
                     if(j == 0) {
                        row = 3;
                     } else if(row != 3) {
                        row = 0;
                        break;
                    }
                }
            }
            if(row != 0) {
                res.add(s);
            }
        }
        return res.toArray(new String[0]);
    }
}
{% endcodeblock %}

### 884. Uncommon Words from Two Sentences
题目大意是给定两个有单词空格组成的字符串，要求找到两个字符串中仅出现一次的单词。
这道题目总共做了三遍用了三种解法，第一遍想法是利用集合概念中交集的补集去做，但是容易忽略两个集合各自重复的元素，它们也是需要在最后的集合中移除掉的。
{% codeblock "Solution" lang:Java https://leetcode.com/problems/uncommon-words-from-two-sentences/ "Uncommon Words from Two Sentences" %}
class Solution {
    public String[] uncommonFromSentences(String A, String B) {
 		Set<String> a = new HashSet<>();
        Set<String> acommon = new HashSet<>();
        String[] asArr = A.split(" ");
        for(int i=0; i<asArr.length; i++) {
            if(a.contains(asArr[i])) {
                acommon.add(asArr[i]);    //a集合中重复的元素记录一下
            } else {
                a.add(asArr[i]);
            }
        }
        Set<String> b = new HashSet<>();
        Set<String> bcommon = new HashSet<>();
        String[] bsArr = B.split(" ");
        for(int i=0; i<bsArr.length; i++) {
            if(b.contains(bsArr[i])) {
                bcommon.add(bsArr[i]);
            } else {
                b.add(bsArr[i]);
            }
        }
        
        Set<String> common = new HashSet<>();
        common.addAll(a);
        common.retainAll(b);   //取交集
        Set<String> res = new HashSet<>();
        res.addAll(a);
        res.addAll(b);    // 取并集
        res.removeAll(bcommon);    //剔除各自集合重复元素
        res.removeAll(acommon);
        for(String t : common) {
            System.out.println(t);
        }
        res.removeAll(common); // 并集再移除交集就是补集
        return res.toArray(new String[0]);
    }
}
{% endcodeblock %}
因为用时7ms过了也懒得把可复用的代码整理下，但是看着冗长所以想了第二种解法。因为是在HashTable标签下，那么想着map应该也能解决，毕竟set也是hashmap中key的集合，所以就很容易想到遍历记录次数，单词仅出现一次的就保留。
{% codeblock "Solution" lang:Java https://leetcode.com/problems/uncommon-words-from-two-sentences/ "Uncommon Words from Two Sentences" %}
class Solution {
    public String[] uncommonFromSentences(String A, String B) {
		String[] asArr = (A+ " " + B).split(" ");
		Map<String, Integer> map = new HashMap<>();
		Set<String> res = new HashSet<>();
		for(int i=0; i<asArr.length; i++) {
			map.put(asArr[i], map.getOrDefault(asArr[i], 0)+1);
		}
		map.forEach((k,v)->{
            System.out.println(k + "==" + v);
            if(v == 1) {
                res.add(k);
            }
        });
        return res.toArray(new String[0]);
    }
}
{% endcodeblock %}
虽然通过了但用了40ms觉得肯定有优化的地方，然后觉得在统计的时候直接存入结果应该会比后面再重头遍历一次好一点，那么只需要每次判断一下出现了一次就放入结果，超了就移除。
{% codeblock "Solution" lang:Java https://leetcode.com/problems/uncommon-words-from-two-sentences/ "Uncommon Words from Two Sentences" %}
class Solution {
    public String[] uncommonFromSentences(String A, String B) {
		String[] asArr = (A+ " " + B).split(" ");
		Map<String, Integer> map = new HashMap<>();
		Set<String> res = new HashSet<>();
		for(int i=0; i<asArr.length; i++) {
			map.put(asArr[i], map.getOrDefault(asArr[i], 0)+1);
			if(map.get(asArr[i]) == 1) {
                res.add(asArr[i]);
            } else {
                res.remove(asArr[i]);
            }
		}
        return res.toArray(new String[0]);
    }
}
{% endcodeblock %}
果然和我判断的一样，当字符多的时候重头再一次一次计数浪费了时间，上面的解法就用了3ms。

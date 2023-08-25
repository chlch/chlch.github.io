---
title: LeetCode Sort系列（三）
toc: true
tags:
  - LeetCode
  - Sort
  - algorithm
category: LeetCode
description: Leetcode Sort 767/1054/147
abbrlink: 1253086526
date: 2020-02-05 17:57:03
---

### 767. Reorganize String
题目大意是给定一个由小写字母组成的字符串S，重新排列它使其任意相邻两个字母都不重复，如果不能排列出这样的字符串返回""，若可以则返回任意一个满足条件的即可。
首先我们先找出重复次数最多的字符，若重复次数大于（S的长度+1)/2，则肯定排列不出满足条件的字符串。接着我们可以把次数出现最多的每隔一个排列，剩余的每隔一个填充进来。

```Java Solution https://leetcode.com/problems/reorganize-string/ Reorganize String
class Solution {
    public String reorganizeString(String S) {
        int[] count = new int[26];
        for(int i=0; i<S.length(); i++) { // 统计每个字符出现次数
            count[S.charAt(i) - 'a']++;
        }
        int max = 0, letter = 0;
        for(int i=0; i<26; i++) {  // 找到出现最多的字符 letter
            if(count[i] > max) {
                max = count[i];
                letter = i;
            }
        }
        if(max > (S.length() + 1)/2) return "";
        char[] c = new char[S.length()];
        int idx = 0;
        while(count[letter]-- > 0) {  // 把letter每隔一个填充到结果里
            c[idx] = (char)(letter + 97);
            idx+=2;  
        }
        for(int i=0; i<26; i++) {
            while(count[i] > 0) {
                if(idx >= S.length()) idx = 1;   // 索引超出后改变位置
                c[idx] = (char)(i+97);
                idx+=2;      // 同样每隔一个
                count[i]--;
            }
        }
        return String.valueOf(c);
    }
}
```

### 1054. Distant Barcodes
题目大意和上面一题雷同，只不过这回的数据结构是数组，将数组里的数字重排使得相邻不相同，题目保证有解。
同样利用上面的思路先将出现次数最多的数每隔一位排好，剩余的数依次填充每隔一位排好。

```Java Solution https://leetcode.com/problems/distant-barcodes Distant Barcodes
class Solution {
    public int[] rearrangeBarcodes(int[] barcodes) {
        Map<Integer, Integer> map = new HashMap<>();
        int code = 0, max = 0;
        for(int i=0; i<barcodes.length; i++) {
            map.put(barcodes[i], map.getOrDefault(barcodes[i], 0) + 1);
            int count = map.get(barcodes[i]);
            if (map.get(barcodes[i]) > max) {
                max = count;
                code = barcodes[i];
            }
        }
        int[] res = new int[barcodes.length];
        int idx = 0;
        while (map.get(code) > 0) {
            res[idx] = code;
            idx += 2;
            map.put(code, map.get(code) - 1);
        }
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            Integer code = entry.getKey();
            Integer count = entry.getValue();
            while (count-- > 0) {
                if (idx >= barcodes.length) idx = 1;
                res[idx] = code;
                idx += 2;
            }
        }
        return res;
    }
}
```
### 147. Insertion Sort List
题目大意是将一个单向链表利用插入排序重新排列好。
插入排序的思想就是在有序的序列基础上从后往前扫描将元素插入到符合条件的位置。
下面的解法就是遍历链表每一个节点，按照插入排序思想再构造一个有序链表。区别就是第一次写的时候没有想到再构造一个虚拟节点出来，直接利用尾结点进行构造，原因是链表只有next一个方向。
后来参考了discuss里的解法，通过构造虚拟节点，代码的可读性及长度明显优化了很多。

```Java Solution https://leetcode.com/problems/insertion-sort-list/ Insertion Sort List
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
	public ListNode insertionSortList(ListNode head) {
        ListNode fakeNode = new ListNode(0);
        ListNode cur = fakeNode;
        while (head != null) {
            ListNode next = head.next;
            cur = fakeNode;
            while (cur.next != null && cur.next.val <= head.val) {
                cur = cur.next;
            }
            head.next = cur.next;
            cur.next = head;
            head = next;
        }
        return fakeNode.next;
    }

    public ListNode insertionSortList2(ListNode head) {
        if(head == null) return null;
        ListNode t = head;
        while(t.next != null) {
            t = t.next;
        }
        ListNode start = t;
        while (head != t) {
            ListNode cur = start;
            ListNode pre = null;
            while (head.val > cur.val && cur.next != null) {
                pre = cur;
                cur = cur.next;
            }
            ListNode c = new ListNode(head.val);
            if (head.val > cur.val) {
                cur.next = c;
            } else {
                c.next = cur;
                if (pre != null) {
                    pre.next = c;
                } else {
                    start = c;
                }
            }
            head = head.next;
        }
        return start;
    }
}
```


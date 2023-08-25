---
title: LeetCode Sort系列（一）
toc: true
tags:
  - LeetCode
  - Sort
  - algorithm
category: LeetCode
description: Leetcode Sort 1030/349/350/1122
abbrlink: 934861492
date: 2019-08-13 11:45:20
---

### 1030. Matrix Cells in Distance Order
题目大意是给定一个R行C列的坐标网格，再给定一个（r0, c0）的坐标点, 把坐标网格中的点与该点的距离按照从小到大的顺序排列出来。
这里用了discuss里面的计数排序的解法，把距离存入了计数的数组中，距离重复就累加。

```Java Solution https://leetcode.com/problems/matrix-cells-in-distance-order/ Matrix Cells in Distance Order
class Solution {
    public int[][] allCellsDistOrder(int R, int C, int r0, int c0) {
        int[][] res = new int[R*C][2];
        int[] count = new int[R+C];
        for(int i=0; i<R; i++) {
            for (int j=0; j<C; j++) {
                int dis = Math.abs(i - r0) + Math.abs(j - c0);
                count[dis]++;
            }
        }
        for (int i=1; i<count.length; i++) {
            count[i] = count[i] + count[i-1];
        }
        for (int i=0; i<R; i++) {
            for (int j=0; j<C; j++) {
                int dis = Math.abs(i - r0) + Math.abs(j - c0);
                res[count[dis] - 1] = new int[]{i,j};
                count[dis]--;
            }
        }
        return res;
    }
}
```
### 349. Intersection of Two Arrays
题目大意是给定两个整型数组，找出他们的交集，需要去重。
最暴力的就是嵌套遍历把相等的数放入set，其次就是把两个数组里的数都放入set，再调用set自身取交集的api。
```Java Solution https://leetcode.com/problems/intersection-of-two-arrays/ intersection-of-two-arrays
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        HashSet<Integer> set1 = new HashSet<Integer>();
    	for (Integer n : nums1) set1.add(n);
    	HashSet<Integer> set2 = new HashSet<Integer>();
    	for (Integer n : nums2) set2.add(n);

   		set1.retainAll(set2);

    	int [] res = new int[set1.size()];
    	int idx = 0;
    	for (int s : set1) res[idx++] = s;
    	return res;
    }
     
} 
```
还有一种就是先将一个数组排序，再利用二叉查找搜索。
```Java Solution https://leetcode.com/problems/intersection-of-two-arrays/ intersection-of-two-arrays
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        Set<Integer> set = new HashSet<>();
		int i = 0;
		Arrays.sort(nums1);
		for(int n : nums2) {
            if(Arrays.binarySearch(nums1, n) >= 0) {
                set.add(n);
            }
        }
        int[] res = new int[set.size()];
		for (int n : set) {
            res[i++] = n;
        }
        return res;
    }
     
} 
```
### 350. Intersection of Two Arrays II
这个题目只要求交集不用去重，那么我们就不能用HashSet了。第一种是利用HashMap，key保存第一个数组中元素，value保存出现的次数，再遍历第二个数组判断map中是否存在，若存在次数减一。这里贴一下第二种解法，把两个数组都排序后从小到大比较。
```Java Solution https://leetcode.com/problems/intersection-of-two-arrays-ii/  Intersection of Two Arrays II
class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        List<Integer> list = new ArrayList<>();
        Arrays.sort(nums1);
        Arrays.sort(nums2);
        int i = 0, j = 0;
        while (i < nums1.length && j < nums2.length) {
            if(nums1[i] == nums2[j]) {
                list.add(nums1[i]);
                i++;j++;
            } else if(nums1[i] < nums2[j]) {
                i++;
            } else {
                j++;
            }
        }

        int[] res = new int[list.size()];
        int k = 0;
        for (int n : list) {
            res[k++] = n;
        }
        return res;
    }
     
} 
```
### 1122. Relative Sort Array
题目大意是给定两个数组arr1，arr2，arr2中元素不重复且都在arr1中，要求把arr1中和arr2中重复的元素按照arr2中元素顺序排序，其余元素从小到大排到后面。这里面感觉最牛逼的解法还是之前提到的计数排序，因为这里面限制了arr1,arr2内的元素大小和长度都小于等于1000，那我们可以用一个1001大小的count数组记录arr1中元素个数。
```Java Solution https://leetcode.com/problems/relative-sort-array/submissions/ Relative Sort Array
class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        int[] count = new int[1001];
        for(int a : arr1) count[a]++;
        int i = 0;
        for(int b : arr2) {                // 先按arr2中元素排好
            while(count[b]-- > 0) {
                arr1[i++] = b;
            }
        }
        for(int k=0; k<1001; k++) {      // 其余部分从小到追加
            while(count[k]-- > 0) {
                arr1[i++] = k;
            }
        }
        return arr1;
    }
}
```
discuss里面提到说如果没有了小于等于1000的限制，那我们就把存储个数的count数组换成TreeMap这种数据结构。


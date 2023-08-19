---
title: LeetCode Sort系列（二）
toc: true
date: 2020-01-28 22:50:21
tags: [LeetCode,Sort,algorithm]
category: LeetCode
description: Leetcode Sort 1329/1305/969
---

### 1329 Sort the Matrix Diagonally
题目大意是给定一个m×n的矩阵，把矩阵里的每条对角线上的数从小到大排序。
很明显就需要逐一对每条对角线的数进行排序，首先明确有m+n-1条对角线。其次就是每条对角线的起始点，横着的有m个起始点，竖着的就有n-1个起始点，横着的横坐标都是0，竖着的纵坐标都是0。
 
```Java Solution https://leetcode.com/problems/sort-the-matrix-diagonally/ Sort the Matrix Diagonally
class Solution {
    public int[][] diagonalSort(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int diagonal = m + n - 1;

        for (int d = 0; d < diagonal; d++) {
            List<Integer> list = new ArrayList<>();
            int start1 = Math.max(0, m - 1 - d);
            int start2 = Math.max(0, d - m + 1);

            for (int i = start1, j = start2; i < m && j < n; i+=1, j+=1) {
                list.add(mat[i][j]);
            }
            Collections.sort(list);
            for(int i=0; i<list.size(); i++) {
                mat[start1++][start2++] = list.get(i);
            }

        }
        return mat;
    }
}
```

### 1305 All Elements in Two Binary Search Trees
题目大意是给定两棵二叉搜索树，把两棵树的所有元素从小到大排列。
这里可以根据BST的性质，分别通过中序遍历把元素存入两个list中，归并比较即可，中序遍历存放时其实就已经排好顺序了。
```Java Solution https://leetcode.com/problems/all-elements-in-two-binary-search-trees All Elements in Two Binary Search Trees
class Solution {
    // 直接利用排序工具类排序
    public List<Integer> getAllElements(TreeNode root1, TreeNode root2) { 
        List<Integer> res = new ArrayList<>();
        helper(root1, res);
        helper(root2, res);
        Collections.sort(res);
        return res;   
    }
    // 比较排序
    public List<Integer> getAllElements2(TreeNode root1, TreeNode root2) {
        List<Integer> res = new ArrayList<>();
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();
        helper(root1, list1);
        helper(root2, list2);
        int l1 = 0, l2 = 0;
        while(l1 < list1.size() && l2 < list2.size()) {
            if (list1.get(l1) < list2.get(l2)) {
                res.add(list1.get(l1));
                l1++;
            } else {
                res.add(list2.get(l2));
                l2++;
            }
        }
        for(int i=l1; i<list1.size(); i++) res.add(list1.get(i));
        for(int i=l2; i<list2.size(); i++) res.add(list2.get(i));
        return res;   
    }
    // discuss中比较的另一种写法
    public List<Integer> getAllElements3(TreeNode root1, TreeNode root2) {
        List<Integer> res = new ArrayList<>();
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();
        helper(root1, list1);
        helper(root2, list2);
        int l1 = 0, l2 = 0;
        while(l1 < list1.size() || l2 < list2.size()){
            if(l2 == list2.size() || l1 < list1.size() && list1.get(l1) <= list2.get(l2)){
                res.add(list1.get(l1));
                l1++;
            } else if(l2 < list2.size()){
                res.add(list2.get(l2));
                l2++;
            }
        }
        return res;   
    }

    public void helper(TreeNode root, List<Integer> list) {
        if (root == null) return;
        helper(root.left, list);
        list.add(root.val);
        helper(root.right, list);
        return;
    }
}
```
### 969. Pancake Sorting
题目大意是给定一个大小为n数组，其中元素为从1到n，不断进行元素的反转即反转从1到k的元素（1到k的元素倒置），经过多少次后整个数组正好是升序排列，记录每次反转位置k，输出最后所有的k的列表。
这里面最核心的思路就是每次找到最大的元素的位置先放到第一个，再把最大的再进行一次反转到其应该在的位置。

```Java Solution https://leetcode.com/problems/pancake-sorting/ Pancake Sorting
class Solution {
    public List<Integer> pancakeSort(int[] A) {
        int n = A.length;
        List<Integer> res = new ArrayList<>();
        for(int i=n; i>0; i--) { // 从最大的元素开始
            int j;
            for(j=0; A[j] != i; j++); // 找到最大元素索引
            res.add(j+1);
            reverse(A, j+1);
            res.add(i);
            reverse(A, i);
        }
        return res;
    }
    public void reverse(int[] arr, int k) {
        for(int i=0, j=k-1; i<j; i++, j--) {
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
}
```
### 1338. Filter Restaurants by Vegan-Friendly, Price and Distance
题目大意是给定一个二维数组类似餐馆，每一项中表示了餐馆的id、rate、veganfriendly、price、distan这些属性，然后根据给定各项属性来筛选符合条件的餐馆，veganfriendly属性需要大于等于给定的值，price和distance需要分别小于等于给定的值，按照rate从大到小排列餐馆id，rate相同id大的在前。
题目逻辑很简单，这里只列出这个利用java8 stream的写法，一开始用了流但是写的啰嗦了点，比如veganfriendly的判断，没有巧妙利用这个大于等于的逻辑，而是用了if-else，后来参考了discuss里面一行的解法选择这个。

```Java Solution https://leetcode.com/problems/filter-restaurants-by-vegan-friendly-price-and-distance/ Filter Restaurants by Vegan-Friendly, Price and Distance
class Solution {
    public List<Integer> filterRestaurants(int[][] restaurants, int veganFriendly, int maxPrice, int maxDistance) {
        return Arrays.stream(restaurants)
        .filter(x -> x[2] >= veganFriendly && x[3] <= maxPrice && x[4] <= maxDistance)
        .sorted((o1, o2) -> {
            if (o1[1] == o2[1]) return o2[0] - o1[0];
            return o2[1] - o1[1];
        })
        .map(x -> x[0])
        .collect(Collectors.toList());
    }
}
```

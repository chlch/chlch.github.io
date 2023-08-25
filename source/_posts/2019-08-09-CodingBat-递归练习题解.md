---
title: CodingBat  递归练习题解
toc: true
tags:
  - 递归
  - CodingBat
  - algorithm
category: 算法
abbrlink: 519794628
date: 2019-08-09 11:14:41
description:
---

一直以来，我理解递归都觉得很困难，简单点的还好，leetcode里有些复杂晦涩冗长的递归真的是太难理解了，所以特地从头训练一遍递归的题目找找感觉，<https://codingbat.com/java> 这个里面的递归练习的题目就很符合我的口味，循序渐进，第一部分的递归基础题目很简单，大概抽空花了两个早上做完了。这里主要记录第二部分难度稍微大一点的递归题目的我的题解。

### groupSum 
题目大意是给定一个整型数组，和一个目标数，从数组中找出一组数要满足这组数的和与目标数相等，如果存在返回true，不存在返回false，不能用循环。
思路就是从这数组中找数字，无非就是两种情况，这个数字要不要，如果选择了那么我们的target就减掉它，如果没选择target保持不变，到最后的递归退出就是判断target是否等于0。
Examples:
	groupSum(0, [2, 4, 8], 10) → true
	groupSum(0, [2, 4, 8], 14) → true
	groupSum(0, [2, 4, 8], 9) → false
```Java Solution https://codingbat.com/prob/p145416 groupSum
public boolean groupSum(int start, int[] nums, int target) {
   if(start >= nums.length ) return target == 0;
   return groupSum(start+1, nums,target) || groupSum(start+1, nums, target-nums[start]);
}
```
### groupSum6 
这道题比上面多了个限制条件就是6必须选。
```Java Solution https://codingbat.com/prob/p199368 groupSum6
public boolean groupSum6(int start, int[] nums, int target) {
  if(start >= nums.length) return target == 0;
  if(nums[start] == 6) return groupSum6(start+1, nums, target-6);
  return groupSum6(start+1, nums, target) || groupSum6(start+1, nums, target-nums[start]);
}
```
### groupNoAdj 
这道题的限制是相邻的数字不能选，我们确定选择了一个数字那就直接跳过下一个。
```Java Solution https://codingbat.com/prob/p169605 groupNoAdj 
public boolean groupNoAdj(int start, int[] nums, int target) {
  if(start >= nums.length) return target == 0;
  return groupNoAdj(start+2,nums,target-nums[start]) || groupNoAdj(start+1,nums,target);
}
```
### groupSum5
这道题的限制是所有5的倍数必须选择，但是紧跟着5倍数后面的1不能选择，这道题的testcase不知道是不是没全，我把1全都不选竟然也能过。
```Java Solution https://codingbat.com/prob/p138907 groupSum5 
public boolean groupSum5(int start, int[] nums, int target) {
  if(start >= nums.length) return target == 0;
  if(nums[start] == 1  &&  nums.length == 1) return true;
  if(nums[start] % 5 == 0) return groupSum5(start+1, nums, target - nums[start]);
  if(nums[start] == 1) return groupSum5(start+1, nums, target);
  return groupSum5(start+1, nums, target - nums[start]) ||  groupSum5(start+1, nums, target);
}
```
但实际上是有问题的，比如groupSum5(0, new int[]{4, 5, 10, 2, 1}, 16)，应该为true才对。
这里面其实是开始的逻辑错了，过了我就没管了，后来经人提醒又改了一遍。
```Java Solution https://codingbat.com/prob/p138907 groupSum5 
public boolean groupSum5(int start, int[] nums, int target) {
  if(start >= nums.length) return target == 0;
  if(nums[start] == 1  &&  nums.length == 1) return true;
  if(nums[start] % 5 == 0) {
	  if(start+1 < nums.length && nums[start+1] == 1) {
	      return groupSum5(start+2, nums, target-nums[start]);
	    } else {
	      return groupSum5(start+1, nums, target-nums[start] );
	   }
  }
  return groupSum5(start+1, nums, target - nums[start]) ||  groupSum5(start+1, nums, target);
}
```
### groupSumClump
这道题的限制是连续出现的数，要么全选择要么全不选，这里允许用一个for来记录连续出现的次数，因为我们知道了连续出现的次数就可以知道需要选择多少个或者不选多少个。
```Java Solution https://codingbat.com/prob/p105136 groupSumClump 
public boolean groupSumClump(int start, int[] nums, int target) {
  if(start >= nums.length) return target == 0;
  int ident = 1;
  for(int i = start; i+1<nums.length; i++) {
    if(nums[i] == nums[i+1]) {
      ident++;
    } else {
      break;
    }
  }
  return groupSumClump(start+ident, nums, target - ident * nums[start]) ||  groupSumClump(start+ident, nums, target); 
}
```
### splitArray
题目大意是能否把这个数组分成两组，两组的和相等，并且每个数字只能分到一组。这里面允许我们用额外的函数来帮助递归。
这题我是沿用之前的思路，选择的数放到一组同时把这组数的和当做目标，然后累加每一个数当做总和，最终比较目标的2倍是否正好与总和相等。
```Java Solution https://codingbat.com/prob/p185204 splitArray 
public boolean splitArray(int[] nums) {
  return helper(0, nums, 0, 0);
}
public boolean helper(int start, int[] nums, int sum, int target) {
 if(start >= nums.length) return target * 2 == sum;
 return helper(start+1, nums, sum + nums[start], target) || helper(start+1, nums, sum + nums[start], target + nums[start]);
}

```
### splitOdd10
这题在上面的基础上加了限制，一组的和要求是10的倍数，另一组的和是奇数。
总的和依然可以知道，放入其中一组的target和也知道，所以继续沿用上面的。
```Java Solution https://codingbat.com/prob/p171660 splitOdd10 
public boolean splitOdd10(int[] nums) {
  return helper(0,nums,0,0);
}
public boolean helper(int start, int[] nums, int sum, int target) {
  if(start>=nums.length) return target % 10 == 0 && (sum - target) % 2 != 0;
  return helper(start+1,nums, sum+nums[start],target+nums[start]) || helper(start+1,nums, sum+nums[start],target);
}
```
### split53
这题要求两组和相等，但是对每一组的数有要求，5的倍数必须在一组，而3的倍数但不是5的倍数的数必须在另一组。
那我们选择选target的时候就要注意放入里面的数字，这里我选择3的倍数但不是5的倍数为目标组。
```Java Solution https://codingbat.com/prob/p168295 split53 
public boolean split53(int[] nums) {
 return helper(0,nums,0,0); 
}
public boolean helper(int start, int[] nums, int sum, int target) {
  if(start >= nums.length) return target * 2 == sum;
  if(nums[start] % 3 == 0 && nums[start] % 5 != 0) return helper(start+1, nums, sum+nums[start], target+nums[start]);
  if(nums[start] % 5 == 0) return helper(start+1, nums, sum+nums[start], target);
   return helper(start+1, nums, sum+nums[start], target) ||  helper(start+1, nums, sum+nums[start], target+nums[start]);
}
```

### 总结
通过以上的题目可以知道，一定要找到递归退出条件的最基本情况，脑海里必须得始终记着这个最基本的原则，上面大部分题目的分解大概就是第一步判断退出条件，第二步写递归逻辑。虽然很多时候理解不了复杂的递归，但是背下来终有一天可以顿悟的，况且有时候你可能只需要一支笔一张纸，不停地记录下每一步递归的返回，或许就搞懂了，共勉。
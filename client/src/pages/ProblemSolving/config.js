/**
 * ProblemSolving Module Configuration
 * Centralized config for editors, test cases, UI constants
 */

export const LANGUAGE_DEFAULTS = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var solution = function(nums, target) {
    
};`,
  python: `def solution(nums: list, target: int) -> list:
    pass`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
  c: `int* solution(int* nums, int numsSize, int target, int* returnSize) {
    
}`,
  typescript: `function solution(nums: number[], target: number): number[] {
    
};`,
  go: `func solution(nums []int, target int) []int {
    
}`,
  rust: `impl Solution {
    pub fn solution(nums: Vec<i32>, target: i32) -> Vec<i32> {
        
    }
}`,
};

export const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
];

// Difficulty styling
export const DIFFICULTY_COLORS = {
  easy: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  hard: 'text-red-600 dark:text-red-400',
};

// UI Layout Constants
export const UI_CONFIG = {
  resizable: {
    minLeftWidth: 350,
    minRightWidth: 350,
    defaultLeftWidth: 50,
    minPercentage: 30,
    maxPercentage: 70,
  },
  drawer: {
    maxWidth: '600px',
    maxMobileWidth: '90vw',
  },
  editor: {
    fontSize: 14,
    tabSize: 2,
    minimap: false,
  },
};

// Component Status & Enums
export const STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

export const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
};

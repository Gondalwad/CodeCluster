export const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' }
];

export const DEFAULT_CODE = {
  javascript: '/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};',
  python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ',
  java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}',
  cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
  c: 'int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}',
  typescript: 'function twoSum(nums: number[], target: number): number[] {\n    \n};',
  go: 'func twoSum(nums []int, target int) []int {\n    \n}',
  rust: 'impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        \n    }\n}'
};

export const DIFFICULTY_COLORS = {
  easy: 'text-green-600 dark:text-green-400',
  medium: 'text-yellow-600 dark:text-yellow-400',
  hard: 'text-red-600 dark:text-red-400'
};

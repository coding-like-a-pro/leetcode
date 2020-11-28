class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const sumTree = (tree: TreeNode | null): number => {
  if (!tree) return 0;

  const { left, right, val } = tree;

  return val + sumTree(left) + sumTree(right);
};

function findTilt(root: TreeNode | null): number {
  const iter = (tree: TreeNode | null) => {
    if (!tree) return tree;

    const { left, right } = tree;

    const leftRightSumDiff = [left, right]
      .map(sumTree)
      .reduce((prev, item) => Math.abs(prev - item));

    const newTree = new TreeNode(leftRightSumDiff, iter(left), iter(right));
    return newTree;
  };
  const newTree = iter(root);
  return sumTree(newTree);
}

export default findTilt;

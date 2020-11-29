const sumTree = (tree: TreeNode | null): number => {
  if (!tree) return 0;

  const { left, right, val } = tree;

  return val + sumTree(left) + sumTree(right);
};

const copyTree = (tree: TreeNode | null): TreeNode | null => {
  if (!tree) return tree;
  
  const {left, right, val} = tree;
  const newTree = new TreeNode(val);
  newTree.left = copyTree(left);
  newTree.right = copyTree(right);
  return newTree;
};

function findTilt(root: TreeNode | null): number {
  const iter = (tree: TreeNode | null) => {
    if (!tree) return 0;

    const { left, right, val } = tree;

    const leftSum = iter(left);
    const rightSum = iter(right);
    const sum = leftSum + rightSum + val;

    tree.val = Math.abs(leftSum - rightSum);
    
    return sum;
  };
  
  const newTree = copyTree(root);
  iter(newTree);
  return sumTree(newTree);
}

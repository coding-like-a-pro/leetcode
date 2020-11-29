function minDiffInBST(root: TreeNode | null): number {
    let treeToArr: number[] = [];
    const iter = (tree: TreeNode | null) => {
        if (!tree) return;
        const {left, right, val} = tree;
        iter(left);
        treeToArr.push(val);
        iter(right);
      
    }
    iter(root);
  
    let min;
    for (let i = 0; i < treeToArr.length - 1; i += 1) {
        const diff = Math.abs(treeToArr[i] - treeToArr[i + 1]);
        min = min !== undefined ? Math.min(min, diff) : diff;
    }
    
    return min;
};
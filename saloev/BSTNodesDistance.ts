function minDiffInBST(root: TreeNode | null): number {
    let treeToArr: number[] = [];
    const iter = (tree: TreeNode | null) => {
        if (!tree) return;
        const {left, right, val} = tree;
        treeToArr.push(val);
        iter(left);
        iter(right);
    }
    iter(root);
    
    let min = Math.abs(treeToArr[1] - treeToArr[0]);
    for (let i = 0; i < treeToArr.length; i += 1) {
        for (let j = i + 1; j < treeToArr.length; j += 1) {
            const diff = Math.abs(treeToArr[i] - treeToArr[j]);
            min = Math.min(min, diff);
        }
    }
    
    return min;
};
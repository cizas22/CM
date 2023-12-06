import {CoachType} from "./App.tsx";
import {FormikValues} from "formik";

export const findItemById = (tree: CoachType, id: string): CoachType | null => {
    if (tree.fullName === id) {
        return tree;
    }

    for (const child of tree.members) {
        const result: CoachType | null = findItemById(child, id);
        if (result) {
            return result;
        }
    }

    return null;
}

export const findParent = (tree: CoachType, id: string): CoachType | null => {
    if (tree.id === id) {
        return tree;
    }

    for (const child of tree.members) {
        const result: CoachType | null = findItemById(child, id);
        if (result) {
            return tree;
        }
    }

    return null;
}

export const deleteById = (tree: CoachType, id: string) => {
    const memberToDelete = tree?.members.find(m => m.id === id);
    if (memberToDelete) {
        const index = tree.members.indexOf(memberToDelete);
        if (memberToDelete.members.length) {
            tree.members.push(...memberToDelete.members);
        }
        tree.members.splice(index, 1);
        return;
    }


    for (const child of tree.members) {
        deleteById(child, id);
    }
}

export const getUniqueNames = (tree: CoachType): Array<string> => {
    const uniqueNames: Set<string> = new Set();

    const traverse = (node: CoachType) => {
        uniqueNames.add(node.fullName);
        if (node.members) {
            for (const child of node.members) {
                traverse(child);
            }
        }
    }

    traverse(tree);
    return [...uniqueNames];
}

const swapElement = (array: Array<CoachType>, indexA: number, indexB: number) => {
    const tmp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = tmp;
};


export const orderUp = (coaches: CoachType, id: string) => {
    const parent = findParent(coaches, id);
    if (!parent) {
        return;
    }
    const i = (parent?.members.findIndex(m => m.id === id));
    if (!i || i < 0) {
        return;
    }

    swapElement(parent.members, i, i - 1);
}

export const orderDown = (coaches: CoachType, id: string) => {
    const parent = findParent(coaches, id);
    const i = (parent?.members.findIndex(m => m.id === id));
    if (!parent) {
        return;
    }
    if (i == undefined || i + 1 >= parent?.members.length) {
        return;
    }

    swapElement(parent.members, i, i + 1);
}

export const addMember = (couch: CoachType, values: FormikValues) => {
    if (couch.members.length >= 2000) {
        return;
    }
    return couch?.members?.push({
        email: "",
        fullName: "", ...values,
        id: values.fullName.trim().toLowerCase(),
        members: []
    });
}


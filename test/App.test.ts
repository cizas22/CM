import {expect, test} from 'vitest'
import {addMember, deleteById, findItemById, findParent, orderDown, orderUp} from "../src/utils";
import {CoachType} from "../src/App";

const sampleTree: CoachType = {
    fullName: 'Barakat Yehud',
    email: 'barakat.yehud@example.com',
    id: 'root',
    members: [
        {
            fullName: 'Barack Obama',
            email: 'barack.obama@example.com',
            id: 'child1',
            members: [
                {
                    fullName: 'Johny Depp',
                    email: 'johny.depp@example.com',
                    id: 'grandchild1',
                    members: [],
                },
            ],
        },
        {
            fullName: 'Bill Flinton',
            email: 'bill.flinton@example.com',
            id: 'child2',
            members: [],
        },
    ],
};

test('findItemById should handle invalid id', () => {
    const result = findItemById(sampleTree, 'nonexistent');
    expect(result).toBeNull();
});

test('findParent should handle invalid id', () => {
    const result = findParent(sampleTree, 'nonexistent');
    expect(result).toBeNull();
});

test('deleteById should handle invalid id', () => {
    const treeCopy = {...sampleTree};
    deleteById(treeCopy, 'nonexistent');
    expect(treeCopy).toEqual(sampleTree);
});

test('orderUp should handle moving the first element up', () => {
    const treeCopy = {...sampleTree};
    orderUp(treeCopy, 'root');
    expect(treeCopy).toEqual(sampleTree);
});

test('orderDown should handle moving the last element down', () => {
    const treeCopy = {...sampleTree};
    orderDown(treeCopy, 'child2');
    expect(treeCopy).toEqual(sampleTree);
});

test('addMember should handle reaching the maximum number of members', () => {
    const dummyMembers = [];
    for (let i = 0; i < 2000; i++) {
        dummyMembers.push({fullName: 'a', email: 'a@a.com'});
    }
    const fullTree: CoachType = {
        fullName: 'FullRoot',
        email: 'fullroot@example.com',
        id: 'fullroot',
        members: [...dummyMembers],
    };

    const values = {
        fullName: 'NewMember',
        email: 'newmember@example.com',
    };

    addMember(fullTree, values);

    // Since the tree already has the maximum number of members, adding a new member should not change anything.
    expect(fullTree.members.length).toBe(2000);
});

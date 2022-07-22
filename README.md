# WHAT IS THIS REPOSITORY 
I wanted to create a small project to demonstrate a solution for a fairly common problem in React. This is the use case:

```
I have a list of objects for my end user to modify. The objects have multiple properties that can each be edited.
The user can add or remove objects from their list. The items in the list should have validation for blank entries
and for uniqueness. Users should be able to search for entries in the list.
```

I have seen this implemented in a variety of different ways and usually there is some issue that prevents
it from being performant. This will eventually be the supporting project for a quick write up about redux + react performance 
pitfalls on [my website](https://lucasgauk.com).

# COMMON PERFORMANCE PITFALLS TO ADDRESS
1. Using useSelect correctly and createSelector for filtering and other complicated operations.
   1. An example of this is the search bar.
2. Only pull what you need from the state. 
   1. Example of this the component that renders all of the individual rows. Does it need to have the original list? No. Selector for list of IDs. Should not regenerate if the list changes.
   2. Another example is validation. Do not pull all other names, create a selector that tells you if there is another name that matches.
3. Do not tell the reducer what the state is. Action should just tell the state what the component knows that it doesn't.
   1. We deal a lot with lists of complicated objects. Generally edit / save / delete buttons should only take IDs. You should almost never pass the whole object back to the reducer, because odds are your component doesnt need the whole object.
4. Memoize. Our app really shouldn't need it, but implement it as an example.
   1. Should be a last resort. Ideally you will not need to memoize if you have done steps 1 - 3 correctly. Also much harder to do right.
   2. Immutability. 
      1. Make sure you are not cloning each item when you are modifying a single item in the array. 
      2. Try to avoid deeply nesting the state if possible.
   3. Watch out for callbacks (useCallback)
5. Pagination & infinite scroll for enormous lists.

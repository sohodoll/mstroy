type Item = {
  id: string | number
  parent: string | number
  type?: string | null
}

class TreeStore {
  items: Item[]
  itemMap: Map<string | number, Item>

  constructor(items: Item[]) {
    this.items = items
    this.itemMap = new Map()

    //creating a map for quick access by id
    for (const item of items) {
      this.itemMap.set(item.id, item)
    }
  }

  getAll(): Item[] {
    return this.items
  }

  getItem(id: string | number): Item | undefined {
    return this.itemMap.get(id)
  }

  getChildren(id: string | number): Item[] {
    const children: Item[] = []
    for (const item of this.items) {
      if (item.parent === id) {
        children.push(item)
      }
    }
    return children
  }

  getAllChildren(id: string | number): Item[] {
    const allChildren: any[] = []
    const stack: any[] = [id]

    while (stack.length > 0) {
      const currentId = stack.pop()
      const children = this.getChildren(currentId)
      allChildren.push(...children)
      stack.push(...children.map((child) => child.id))
    }

    return allChildren
  }

  getAllParents(id: string | number): Item[] {
    const allParents: any[] = []
    let currentId = id

    while (currentId !== 'root' && currentId !== undefined) {
      const parent = this.itemMap.get(currentId)
      if (parent) {
        allParents.push(parent)
        currentId = parent.parent
      } else {
        break
      }
    }

    return allParents
  }
}

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
]

const ts = new TreeStore(items)

console.log(ts.getAll())
console.log(ts.getItem(7))
console.log(ts.getChildren(4))
console.log(ts.getChildren(5))
console.log(ts.getChildren(2))
console.log(ts.getAllChildren(2))
console.log(ts.getAllParents(7))

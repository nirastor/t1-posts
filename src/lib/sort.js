export const SORT_DEFAULT = 0
export const SORT_ASC = 1
export const SORT_DESC = 2

export const SORT_OPTIONS_MIN = 0
export const SORT_OPTIONS_MAX = 2

export const SORT = {
  [SORT_DEFAULT]: {
    name: 'default',
    icon: '',
    sortFunction: null,
  },
  [SORT_ASC]: {
    name: 'asc',
    icon: '▲',
    sortFunction: (a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0
    },
  },
  [SORT_DESC]: {
    name: 'desc',
    icon: '▼',
    sortFunction: (a, b) => {
      if (a.title < b.title) return 1
      if (a.title > b.title) return -1
      return 0
    },
  },
}

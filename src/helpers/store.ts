import create from 'zustand'

const useStore = create((set): any => {
  return {
    router: null,
    dom: null,
  }
})

export default useStore

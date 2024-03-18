import { useCallback, useState } from 'react'

export function usePopover() {
  const [anchorRef, setAnchorRef] = useState(null)
  const [chevron, setChevron] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
    setChevron(true)
    setAnchorRef(event.currentTarget as any)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setChevron(false)
    setAnchorRef(null)
  }, [])

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState)
    setChevron((prevState) => !prevState)
  }, [])

  return {
    anchorRef,
    handleClose,
    handleOpen,
    handleToggle,
    open,
    chevron,
    setOpen
  }
}
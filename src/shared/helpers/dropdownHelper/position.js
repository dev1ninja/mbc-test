export const canDrop = (menuRef, wrapperRef) => {
    const windowHeight = window.innerHeight;
    const distanceFromWindowTop =
        menuRef.current?.getBoundingClientRect().top -
        menuRef.current?.offsetTop +
        wrapperRef.current?.clientHeight;
    const elementHeight = menuRef.current?.clientHeight;
    const distanceFromBottom = windowHeight - distanceFromWindowTop;
    const canDropDown = elementHeight < distanceFromBottom;
    return canDropDown;
};

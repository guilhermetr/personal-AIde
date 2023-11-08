export const navbarData = [
    {
        routerLink: 'dashboard',
        icon: 'fa-solid fa-home',
        label: 'Dashboard'
    },
    {
        routerLink: 'categories',       
        icon: 'fa-solid fa-list',
        label: 'Categories',
        children: [
        {
            routerLink: 'categories/programming',
            icon: 'fa-solid fa-computer',
            label: 'Programming',
        },
        {
            routerLink: 'categories/writing',
            icon: 'fa-solid fa-pencil',
            label: 'Writing',
        }
        ]
    },
];
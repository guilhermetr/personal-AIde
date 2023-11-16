export const navbarData = [ // TODO: Use the categories service to define this
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
            routerLink: 'categories/writing',
            icon: 'fa-solid fa-pencil',
            label: 'Writing',
        },
        {
            routerLink: 'categories/education',
            icon: 'fa-solid fa-user-graduate',
            label: 'Education',
        },
        {
            routerLink: 'categories/programming',
            icon: 'fa-solid fa-computer',
            label: 'Programming',
        },
        {
            routerLink: 'categories/health',
            icon: 'fa-solid fa-apple-whole',
            label: 'Health',
        },        
        ]
    },
];
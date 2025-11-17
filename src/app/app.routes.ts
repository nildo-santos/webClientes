import { Routes } from '@angular/router';
import { CadastrarClientes } from './pages/cadastrar-clientes/cadastrar-clientes';
import { ConsultarClientes } from './pages/consultar-clientes/consultar-clientes';
import { EditarClientes } from './pages/editar-clientes/editar-clientes';
import { DashboardClientes } from './pages/dashboard-clientes/dashboard-clientes';

export const routes: Routes = [
    {
        path: 'pages/cadastrar-clientes', //Rota
        component: CadastrarClientes //Componente
    },
    {
        path: 'pages/consultar-clientes', //Rota
        component: ConsultarClientes //Componente
    },
    {
        path: 'pages/editar-clientes/:id', //Rota
        component: EditarClientes //Componente
    },
    {
        path: 'pages/dashboard-clientes', //Rota
        component: DashboardClientes //Componente
    },
    {
        path: '', pathMatch: 'full', //Mapeando a página inicial do sistema
        redirectTo: '/pages/dashboard-clientes' //Redirecionamento
    }
];

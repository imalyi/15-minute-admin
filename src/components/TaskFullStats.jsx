

import React, { useEffect, useState } from 'react';
import TableContainer from './TableContainer';
import { useParams } from 'react-router-dom';

function TaskFullStats () {
  const [stats, setStats] = useState([]);
  const { taskid } = useParams();

  const columns = React.useMemo(
    () => [
      {
        Header: 'Start',
        accessor: 'start',
        sortable: true,
        disableFilters: true,
        id: 'started'
      },
      {
        Header: 'Finish',
        accessor: 'finish',
        sortable: true,
        disableFilters: true

      },
      {
        Header: 'items collected',
        accessor: 'items_collected',
        sortable: true,
        disableFilters: true

      },
      {
        Header: 'status',
        accessor: 'status',
        sortable: true,
        disableFilters: true

      },
      {
        Header: 'errors',
        accessor: 'error',
        sortable: true,
        disableFilters: true

      },
    ],
    []
  );

  useEffect(() => {
    const fetchStats = async () => {

        const tokenRefreshString = localStorage.getItem('refreshToken');
        const userRefreshToken = JSON.parse(tokenRefreshString);
        
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        const tokenRefresh = {
            refresh: userRefreshToken,
        };

        const responseToken = await fetch('https://15minadmin.1213213.xyz/users//token/refresh/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(tokenRefresh),
        });

        console.log(responseToken);
        if (responseToken.ok) {
            const data = await responseToken.json();
            localStorage.setItem('refreshToken', JSON.stringify(data.refresh));
            localStorage.setItem('token', JSON.stringify(data.access));
        } else {
            console.error('Błąd podczas refresh token');
        }

        if (!userToken) {
            console.error('Brak tokenu użytkownika.');
            return;
        }

        try {
            const response = await fetch(`https://15minadmin.1213213.xyz/gmaps/result/${taskid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            });

            if (response.ok) {
            const data = await response.json();
            setStats(data);

            } else {
            console.error('Błąd pobierania danych z serwera');
            }
        } catch (error) {
            console.error('Błąd pobierania danych z serwera', error);
        }
    };

    fetchStats();
  }, [taskid]);



  return (
        <>
        <h3 className='auto-center'> {stats.length > 0 && stats[0].task} statistic</h3>
        <TableContainer columns={columns} data={stats} />
        </>
      );
};

export default TaskFullStats;
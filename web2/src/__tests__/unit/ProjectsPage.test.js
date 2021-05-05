import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import nock from 'nock';
import Axios from 'axios';
import ProjectsPage from '../../components/ProjectsPage';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

describe('ProjectsPage', () => {
  it('displays project summary correctly', async () => {
    const id = 1;
    const title = 'Project Name';
    const displayDate = 'Test Project, Always and Forever';
    const info = 'Something involving code';

    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/projects')
      .once()
      .reply(200, {
        items: [
          {
            id,
            title,
            displayDate,
            info,
          },
        ],
      });

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <ProjectsPage />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('Project Name')).toBeInTheDocument();
    });

    expect(screen.getByText('Project Name')).toHaveAttribute(
      'href',
      `/projects/${id}`,
    );
    expect(screen.getByText(displayDate)).toBeInTheDocument();
    expect(screen.getByText(info)).toBeInTheDocument();
    expect(screen.getByText(/Project Details/)).toHaveAttribute(
      'href',
      `/projects/${id}`,
    );
  });
});

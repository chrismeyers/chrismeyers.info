import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import BuildsPage from '../../components/BuildsPage';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

describe('BuildsPage', () => {
  it('displays build summary correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K @ 99.9GHz';

    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds')
      .once()
      .reply(200, {
        items: [
          {
            id,
            displayDate,
            cpu,
          },
        ],
      });

    render(<BuildsPage />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.getByText('Today - Built for Someone')).toBeInTheDocument();
    });

    expect(screen.getByText('Today - Built for Someone')).toHaveAttribute(
      'href',
      `/builds/${id}`,
    );
    expect(
      screen.getByText((content, node) => {
        const hasText = (node) => node.textContent.match(/An Intel 1000000K/);
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child),
        );

        return nodeHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Build Details/)).toHaveAttribute(
      'href',
      `/builds/${id}`,
    );
  });
});

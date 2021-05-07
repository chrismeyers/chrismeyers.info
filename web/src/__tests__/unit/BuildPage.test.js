import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import BuildPage from '../../components/BuildPage';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

jest.mock('simple-react-lightbox', () => ({
  SRLWrapper: ({ children }) => <div>{children}</div>,
}));

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: 1 }),
}));

describe('BuildPage', () => {
  it('handles failure to load a build', async () => {
    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(404);

    render(<BuildPage />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to load build/)).toBeInTheDocument();
    });
  });

  it('displays build details without optional fields correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K CPU @ 99.9GHz';
    const cool = 'Cold Cooling';
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = 'Fast HDD 9999GB @ 9999rpm';
    const ssd = 'Faster SSD 9999GB';
    const gpu = 'The best GPU 99GB';
    const image = null;

    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(200, {
        id,
        displayDate,
        cpu,
        mobo,
        ram,
        hdd,
        gpu,
        image,
      });

    render(<BuildPage />);

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    await expect(screen.findByText(cool)).rejects.toThrow();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd)).toBeInTheDocument();
    await expect(screen.findByText(ssd)).rejects.toThrow();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    await expect(screen.findByTitle('Click to enlarge')).rejects.toThrow();
  });

  it('displays build details without image correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K CPU @ 99.9GHz';
    const cool = 'Cold Cooling';
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = 'Fast HDD 9999GB @ 9999rpm';
    const ssd = 'Faster SSD 9999GB';
    const gpu = 'The best GPU 99GB';
    const image = null;

    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(200, {
        id,
        displayDate,
        cpu,
        cool,
        mobo,
        ram,
        hdd,
        ssd,
        gpu,
        image,
      });

    render(<BuildPage />);

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd)).toBeInTheDocument();
    expect(screen.getByText(ssd)).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    await expect(screen.findByTitle('Click to enlarge')).rejects.toThrow();
  });

  it('displays build details with image correctly', async () => {
    const id = 1;
    const displayDate = 'Today - Built for Someone';
    const cpu = 'Intel 1000000K CPU @ 99.9GHz';
    const cool = 'Cold Cooling';
    const mobo = 'Motherboard with a lot of LEDs';
    const ram = '999GB Fast Memory 9999MHz';
    const hdd = 'Fast HDD 9999GB @ 9999rpm';
    const ssd = 'Faster SSD 9999GB';
    const gpu = 'The best GPU 99GB';
    const image = {
      id: 1,
      path: '/path/to/1.png',
      thumbnail: null,
      title: 'Image 1',
      pos: 1,
      orient: 'land',
    };

    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/builds/1')
      .once()
      .reply(200, {
        id,
        displayDate,
        cpu,
        cool,
        mobo,
        ram,
        hdd,
        ssd,
        gpu,
        image,
      });

    render(<BuildPage />);

    await waitFor(() => {
      expect(screen.getByText(displayDate)).toBeInTheDocument();
    });

    expect(screen.getByText(cpu)).toBeInTheDocument();
    expect(screen.getByText(cool)).toBeInTheDocument();
    expect(screen.getByText(mobo)).toBeInTheDocument();
    expect(screen.getByText(ram)).toBeInTheDocument();
    expect(screen.getByText(hdd)).toBeInTheDocument();
    expect(screen.getByText(ssd)).toBeInTheDocument();
    expect(screen.getByText(gpu)).toBeInTheDocument();
    expect(screen.getByTitle('Click to enlarge')).toHaveAttribute(
      'src',
      image.path,
    );
    expect(screen.getByTitle('Click to enlarge').closest('a')).toHaveAttribute(
      'href',
      image.path,
    );
  });
});

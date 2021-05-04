import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import ResumePage from '../../components/ResumePage';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

describe('ResumePage', () => {
  it('displays experience section correctly', async () => {
    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume')
      .once()
      .reply(200, {
        experience: [
          {
            url: 'https://company.com',
            firstLine: ['Somewhere', 'Anywhere, Earth'],
            secondLine: [['Wizard', 'Jan. 1234 &ndash; Present']],
            info: [['Did this thing', 'Did that thing']],
          },
        ],
      });

    render(<ResumePage />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com',
    );
    expect(screen.getByText('Somewhere').closest('li')).toHaveClass('company');
    expect(screen.getByText('Anywhere, Earth')).toHaveClass('location');
    expect(screen.getByText('Wizard')).toHaveClass('job-title');
    expect(screen.getByText('Jan. 1234 \u2013 Present')).toHaveClass('tenure');
    expect(screen.getByText('Did this thing')).toHaveClass('more-info');
    expect(screen.getByText('Did that thing')).toHaveClass('more-info');
  });

  it('displays experience section without info correctly', async () => {
    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume')
      .once()
      .reply(200, {
        experience: [
          {
            url: 'https://company.com',
            firstLine: ['Somewhere', 'Anywhere, Earth'],
            secondLine: [['Wizard', 'Jan. 1234 &ndash; Present']],
          },
        ],
      });

    render(<ResumePage />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com',
    );
    expect(screen.getByText('Somewhere').closest('li')).toHaveClass('company');
    expect(screen.getByText('Anywhere, Earth')).toHaveClass('location');
    expect(screen.getByText('Wizard')).toHaveClass('job-title');
    expect(screen.getByText('Jan. 1234 \u2013 Present')).toHaveClass('tenure');
  });

  it('displays multiple experience at some company correctly', async () => {
    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume')
      .once()
      .reply(200, {
        experience: [
          {
            url: 'https://company.com',
            firstLine: ['Somewhere', 'Anywhere, Earth'],
            secondLine: [
              ['Wizard', 'Jan. 1234 &ndash; Present'],
              ['Sorcerer', 'Jan. 1000 &ndash; Dec. 1233'],
            ],
            info: [
              ['Did this thing as a wizard', 'Did that thing as a wizard'],
              ['Did this thing as a sorcerer', 'Did that thing as a sorcerer'],
            ],
          },
        ],
      });

    render(<ResumePage />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('Somewhere')).toHaveAttribute(
      'href',
      'https://company.com',
    );
    expect(screen.getByText('Somewhere').closest('li')).toHaveClass('company');
    expect(screen.getByText('Anywhere, Earth')).toHaveClass('location');
    expect(screen.getByText('Wizard')).toHaveClass('job-title');
    expect(screen.getByText('Jan. 1234 \u2013 Present')).toHaveClass('tenure');
    expect(screen.getByText('Sorcerer')).toHaveClass('job-title');
    expect(screen.getByText('Jan. 1000 \u2013 Dec. 1233')).toHaveClass(
      'tenure',
    );
    expect(screen.getByText('Did this thing as a wizard')).toHaveClass(
      'more-info',
    );
    expect(screen.getByText('Did that thing as a wizard')).toHaveClass(
      'more-info',
    );
    expect(screen.getByText('Did this thing as a sorcerer')).toHaveClass(
      'more-info',
    );
    expect(screen.getByText('Did that thing as a sorcerer')).toHaveClass(
      'more-info',
    );
  });

  it('displays education section correctly', async () => {
    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume')
      .once()
      .reply(200, {
        education: [
          {
            url: 'https://school.edu',
            firstLine: ['Degree', 'Anywhere, Earth'],
            secondLine: [['School', 'Jan. 9999 &ndash; Dec. 9999']],
            info: [['Took a class', 'Took another class']],
          },
        ],
      });

    render(<ResumePage />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('School')).toHaveAttribute(
      'href',
      'https://school.edu',
    );
    expect(screen.getByText('School').closest('li')).toHaveClass('school');
    expect(screen.getByText('Degree')).toHaveClass('degree');
    expect(screen.getByText('Anywhere, Earth')).toHaveClass('location');
    expect(screen.getByText('Jan. 9999 \u2013 Dec. 9999')).toHaveClass(
      'tenure',
    );
    expect(screen.getByText('Took a class')).toHaveClass('more-info');
    expect(screen.getByText('Took another class')).toHaveClass('more-info');
  });

  it('displays education section without info correctly', async () => {
    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume')
      .once()
      .reply(200, {
        education: [
          {
            url: 'https://school.edu',
            firstLine: ['Degree', 'Anywhere, Earth'],
            secondLine: [['School', 'Jan. 9999 &ndash; Dec. 9999']],
          },
        ],
      });

    render(<ResumePage />);

    await waitFor(() => {
      expect(screen.getByText('Anywhere, Earth')).toBeInTheDocument();
    });

    expect(screen.getByText('School')).toHaveAttribute(
      'href',
      'https://school.edu',
    );
    expect(screen.getByText('School').closest('li')).toHaveClass('school');
    expect(screen.getByText('Degree')).toHaveClass('degree');
    expect(screen.getByText('Anywhere, Earth')).toHaveClass('location');
    expect(screen.getByText('Jan. 9999 \u2013 Dec. 9999')).toHaveClass(
      'tenure',
    );
  });

  it('displays skills section correctly', async () => {
    nock(process.env.REACT_APP_API_BASE_URL)
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/resume')
      .once()
      .reply(200, {
        skills: [
          {
            mainItem: 'Multiple subitems',
            subItems: ['Sub 1', 'Sub 2'],
          },
          {
            mainItem: 'One subitem',
            subItems: ['Sub 3'],
          },
          {
            mainItem: 'No subitems',
            subItems: [],
          },
        ],
      });

    render(<ResumePage />);

    await waitFor(() => {
      expect(screen.getByText('Multiple subitems')).toBeInTheDocument();
    });

    const multiple = screen.getByText('Multiple subitems');
    expect(multiple).toHaveClass('skill-wrapper');
    expect(multiple.querySelector('ul').children.length).toBe(2);

    const one = screen.getByText('One subitem');
    expect(one).toHaveClass('skill-wrapper');
    expect(one.querySelector('ul').children.length).toBe(1);

    const none = screen.getByText('No subitems');
    expect(none).toHaveClass('skill-wrapper');
    expect(none.querySelector('ul')).toBeNull();
  });
});

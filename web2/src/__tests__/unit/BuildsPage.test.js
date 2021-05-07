import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import Axios from 'axios';
import ProjectsPage from '../../components/ProjectsPage';

Axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

describe('BuildsPage', () => {
  it('displays build summary correctly', async () => {});
});

import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Logs from './index.js';

import axios from 'axios';

jest.mock('axios');

describe("<Logs />", () => {
    beforeEach(() => jest.clearAllMocks());

    const fakeResponse = [{
        "_id": "63c848907e38824ef4eb73d3",
        "nameCommand": "ready",
        "type": "Info",
        "date": "2023-01-18T19:29:20.696+00:00",
        "stacktrace": [
            "The client 1 is ready!"
        ]
    }];

    test("fetch list with data logs", async () => {
        axios.get.mockResolvedValue({
            data: fakeResponse,
        });

        render(<Logs />);
        await waitFor(() => {
            screen.getByText("ready");
        });
    });

    test("fetch list without data logs", async () => {
        axios.get.mockResolvedValue({
            data: [],
        });

        render(<Logs />);
        await waitFor(() => {
            screen.getAllByTestId("alerta");
        });
    });

    test("fetch list logs failed", async () => {
        axios.get.mockRejectedValue({
            data: [],
        });

        render(<Logs />);
        await waitFor(() => {
            screen.getAllByTestId("alerta");
        });

        const dropdwonBtn = screen.getByTestId("alertaButtonClose");
        fireEvent.click(dropdwonBtn);
    });
})
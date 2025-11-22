import type { TableData } from "@/types/TableData";

export const useGetAllShortUrls = (): TableData[] => {
  // TODO: Implement api call to fetch list of all short urls.
  return [
    {
      short_code: "B2C3",
      long_url:
        "https://www.example.com/some/very/long/url/that/needs/to/be/shortened3",
      total_clicks: 120,
      last_clicked: "2024-06-15 10:30:00",
    },
    {
      short_code: "1B2C4",
      long_url:
        "https://www.example.com/some/very/long/url/that/needs/to/be/shortened2",
      total_clicks: 120,
      last_clicked: "2024-06-15 10:30:00",
    },
    {
      short_code: "CAB15",
      long_url:
        "https://www.example.com/some/very/long/url/that/needs/to/be/shortened5",
      total_clicks: 120,
      last_clicked: "2024-06-15 10:30:00",
    },
    {
      short_code: "B21C6",
      long_url:
        "https://www.example.com/some/very/long/url/that/needs/to/be/shortened1",
      total_clicks: 120,
      last_clicked: "2024-06-15 10:30:00",
    },
    {
      short_code: "A1B2C7",
      long_url:
        "https://www.example.com/some/very/long/url/that/needs/to/be/shortened0",
      total_clicks: 120,
      last_clicked: "2024-06-15 10:30:00",
    },
    {
      short_code: "A2C8B",
      long_url:
        "https://www.example.com/some/very/long/url/that/needs/to/be/shortened4",
      total_clicks: 120,
      last_clicked: "2024-06-15 10:30:00",
    },
  ];
};

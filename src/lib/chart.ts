// lib/chart.ts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  BubbleController,
  RadarController,
  RadialLinearScale,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  BubbleController,
  RadarController,
  RadialLinearScale,
  LineElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
);

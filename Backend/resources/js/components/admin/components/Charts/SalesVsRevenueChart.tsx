import React, { useState } from 'react'
import { useGetSalesVsRevenueQuery } from '@/services/api/admin/dashboardApi'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import LoadingScreen from '@/components/LoadingScreen'

const initialRevenueOptions: ApexOptions = {
    legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        height: 335,
        type: 'area',
        dropShadow: {
            enabled: true,
            color: '#623CEA14',
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },

        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: 'straight',
    },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: '#fff',
        strokeColors: ['#3056D3', '#80CAEE'],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        hover: {
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: 'category',
        categories: [],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: '0px',
            },
        },
        min: 0,
        max: 100,
    },
}

const initialSalesOptions: ApexOptions = {
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'bar',
        height: 335,
        stacked: true,
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
    },

    responsive: [
        {
            breakpoint: 1536,
            options: {
                plotOptions: {
                    bar: {
                        borderRadius: 0,
                        columnWidth: '25%',
                    },
                },
            },
        },
    ],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '25%',
        },
    },
    dataLabels: {
        enabled: false,
    },

    xaxis: {
        categories: [],
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Satoshi',
        fontWeight: 500,
        fontSize: '14px',
    },
    fill: {
        opacity: 1,
    },
}

const SalesVsRevenueChart: React.FC = () => {
    const [filter, setFilter] = useState<'week' | 'month' | 'year'>('week')

    // Adjust the query to include the selected filter
    const { data: chartData, isLoading, isError } = useGetSalesVsRevenueQuery(filter)

    if (isLoading) {
        return <LoadingScreen />
    }

    const revenueChartOptions: ApexOptions = {
        ...initialRevenueOptions,
        xaxis: {
            ...initialRevenueOptions.xaxis,
            categories: chartData?.categories || [],
        },
        yaxis: [
            {
                min: 0,
                max: Math.max(...(chartData?.revenue || [0])) + 100,
            },
        ],
    }

    let revenueSeries: { name: string; data: number[] }[] = [{ name: 'Revenue', data: chartData?.revenue || [] }]

    const salesChartOptions: ApexOptions = {
        ...initialSalesOptions,
        xaxis: {
            ...initialSalesOptions.xaxis,
            categories: chartData?.categories || [],
        },
        yaxis: [
            {
                min: 0,
                max: Math.max(...(chartData?.sales || [0])) + 10,
            },
        ],
    }

    let salesSeries: { name: string; data: number[] }[] = [{ name: 'Sales', data: chartData?.sales || [] }]

    const handleFilterChange = (selectedFilter: 'week' | 'month' | 'year') => {
        setFilter(selectedFilter)
    }

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <h2 className="font-semibold text-2xl">Sales Vs Revenue</h2>

                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button
                            onClick={() => handleFilterChange('week')}
                            className={`rounded py-1 px-3 text-xs font-medium ${
                                filter === 'week'
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-black dark:bg-meta-4 dark:text-white'
                            }`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => handleFilterChange('month')}
                            className={`rounded py-1 px-3 text-xs font-medium ${
                                filter === 'month'
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-black dark:bg-meta-4 dark:text-white'
                            }`}
                        >
                            Month
                        </button>
                        <button
                            onClick={() => handleFilterChange('year')}
                            className={`rounded py-1 px-3 text-xs font-medium ${
                                filter === 'year'
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-black dark:bg-meta-4 dark:text-white'
                            }`}
                        >
                            Year
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-5 sm:gap-7">
                {/* Revenue Chart */}
                <div className="w-full sm:w-1/2">
                    <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                        <div className="flex min-w-47.5">
                            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                            </span>
                            <div className="w-full">
                                <p className="font-semibold text-primary">
                                    Total Revenue : Rs.{chartData?.total_revenue}
                                </p>
                                <p className="text-sm font-medium">{chartData?.range}</p>
                            </div>
                        </div>
                    </div>
                    <ReactApexChart options={revenueChartOptions} series={revenueSeries} type="area" height={350} />
                </div>

                {/* Sales Chart */}
                <div className="w-full sm:w-1/2">
                    <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                        <div className="flex min-w-47.5">
                            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                            </span>
                            <div className="w-full">
                                <p className="font-semibold text-primary">Total Sales : {chartData?.total_sales}</p>
                                <p className="text-sm font-medium">{chartData?.range}</p>
                            </div>
                        </div>
                    </div>
                    <ReactApexChart options={salesChartOptions} series={salesSeries} type="bar" height={350} />
                </div>
            </div>
        </div>
    )
}

export default SalesVsRevenueChart

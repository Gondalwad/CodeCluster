// to be developed by Sudarshan

import { useState, useEffect } from "react";
import {
    FaBuilding,
    FaChartBar,
    FaCheckSquare,
    FaClipboardList,
    FaClock,
    FaQuestionCircle,
} from "react-icons/fa";

import DashboardLayout from "../components/DashboardLayout";
import { fetchUserProfile } from "../../jsFunctions";

// Sidebar Configuration

const SIDEBAR_GROUPS = [
    {
        groupLabel: "My Institute",
        items: [
            {
                key: "my-institute",
                label: "Institute Details",
                icon: <FaBuilding />,
            },
        ],
    },

    {
        groupLabel: "Assessments",
        items: [
            {
                key: "upcoming",
                label: "Upcoming Assessments",
                icon: <FaClock />,
            },
            {
                key: "live",
                label: "Live Assessments",
                icon: <FaClipboardList />,
            },
            {
                key: "completed",
                label: "Completed Assessments",
                icon: <FaCheckSquare />,
            },
            {
                key: "results",
                label: "My Results",
                icon: <FaChartBar />,
            },
        ],
    },

    {
        groupLabel: "Support",
        items: [
            {
                key: "help",
                label: "Help",
                icon: <FaQuestionCircle />,
            },
        ],
    },
];


// Page Title

function getTitleFromKey(key) {
    for (const group of SIDEBAR_GROUPS) {
        const item = group.items.find((i) => i.key === key);
        if (item) return item.label;
    }

    return "User Dashboard";
}

// Sections

function InstituteDetails() {
    return <h2>Institute Details</h2>;
}

function UpcomingAssessments() {
    return <h2>Upcoming Assessments</h2>;
}

function LiveAssessments() {
    return <h2>Live Assessments</h2>;
}

function CompletedAssessments() {
    return <h2>Completed Assessments</h2>;
}

function MyResults() {
    return <h2>My Results</h2>;
}

function Help() {
    return <h2>Help</h2>;
}

// Section Router

function SectionRouter({ activeKey }) {
    switch (activeKey) {
        case "my-institute":
            return <InstituteDetails />;

        case "upcoming":
            return <UpcomingAssessments />;

        case "live":
            return <LiveAssessments />;

        case "completed":
            return <CompletedAssessments />;

        case "results":
            return <MyResults />;

        case "help":
            return <Help />;

        default:
            return <UpcomingAssessments />;
    }
}


// User Dashboard

export default function User() {
    if (!localStorage.getItem("jwt")) {
        window.location.href = "/Home";
        return null;
    }

    const [activeKey, setActiveKey] = useState("upcoming");
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        fetchUserProfile().then(setUserProfile);
    }, []);

    return (
        <DashboardLayout
            sidebarGroups={SIDEBAR_GROUPS}
            userProfile={userProfile}
            activeKey={activeKey}
            onSelect={setActiveKey}
            pageTitle={getTitleFromKey(activeKey)}
        >
            <SectionRouter activeKey={activeKey} />
        </DashboardLayout>
    );
}
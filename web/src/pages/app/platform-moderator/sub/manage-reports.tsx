/* eslint-disable no-alert */
import React, { useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useQuery, useMutation, NetworkStatus } from '@apollo/client';
import NoteReportList from '../../../../components/Note/NoteReportList';
import StatsCard from '../../../../components/lib/StatsCard';
import { mapNoteReportsRequest } from '../utils';
import { toastifyError, toastifySuccess } from '../../../../utils';

const GET_NOTE_REPORTS = loader('../../../../queries/notes/reports.gql');
const ACCEPT = loader('../../../../queries/notes/report-accept.gql');
const REJECT = loader('../../../../queries/notes/report-reject.gql');

const limit = 1;
const Manage = () => {
  const [noteReports, setNoteReports] = useState<any[]>([]);
  const query = GET_NOTE_REPORTS;
  const [stat, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });
  const { error, loading, refetch, networkStatus } = useQuery(query, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    variables: {
      limit,
    },
    onCompleted: ({
      reports: ns,
      total: {
        aggregate: { count: total },
      },
      totalPending: {
        aggregate: { count: pending },
      },
      totalAccepted: {
        aggregate: { count: accepted },
      },
      totalRejected: {
        aggregate: { count: rejected },
      },
    }) => {
      const fetchedNoteReports = [...(ns as any[]).map(mapNoteReportsRequest)];
      setNoteReports(fetchedNoteReports);
      setStats({ total, pending, accepted, rejected });
    },
  });

  const [reject, { loading: rejectLoading }] = useMutation(REJECT, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      toastifySuccess({
        title: 'Action Completed',
        description: 'Report has been ignored',
      });
      setNoteReports([]);
      refetch();
    },
  });

  const [accept, { loading: acceptLoading }] = useMutation(ACCEPT, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      toastifySuccess({
        title: 'Action Completed',
        description: 'Report has been accepted',
      });
      setNoteReports([]);

      refetch();
    },
  });
  const onReject = (id: string, username: string) => {
    if (window.confirm('Are you sure? this action is permanent')) {
      reject({ variables: { id, username } });
    }
  };
  const onAccept = (id: string, username: string) => {
    if (window.confirm('Are you sure? this action is permanent')) {
      accept({ variables: { id, username } });
    }
  };
  return (
    <>
      <SimpleGrid spacing={2} columns={{ base: 1, md: 4 }}>
        <StatsCard
          title="Total Reports"
          description="Issues Reported by students on published notes"
          stat={stat.total}
        />
        <StatsCard
          title="Pending Reports"
          description="Issues Reported by students on published notes"
          stat={stat.pending}
        />
        <StatsCard
          title="Valid Reports"
          description="Reports that have been deemed valid by platform moderators"
          stat={`${
            (stat.accepted / (stat.accepted + stat.rejected || 1)) * 100
          }%`}
        />
        <StatsCard
          title="Invalid Reports"
          description="Reports that have been deemed invalid by platform moderators"
          stat={`${
            (stat.rejected / (stat.accepted + stat.rejected || 1)) * 100
          }%`}
        />
      </SimpleGrid>
      <NoteReportList
        error={error}
        onReject={onReject}
        onAccept={onAccept}
        loading={
          loading ||
          rejectLoading ||
          acceptLoading ||
          networkStatus === NetworkStatus.refetch
        }
        data={noteReports}
      />
    </>
  );
};

export default Manage;

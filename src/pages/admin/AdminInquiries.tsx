import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, Mail, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean | null;
  created_at: string;
}

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { toast } = useToast();

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const viewInquiry = async (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setDialogOpen(true);

    if (!inquiry.read) {
      await supabase
        .from('inquiries')
        .update({ read: true })
        .eq('id', inquiry.id);
      fetchInquiries();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    const { error } = await supabase.from('inquiries').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Inquiry deleted successfully.' });
      fetchInquiries();
    }
  };

  const unreadCount = inquiries.filter(i => !i.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Inquiries</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount > 1 ? 's' : ''}` : 'All messages read'}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No inquiries yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow 
                    key={inquiry.id} 
                    className={!inquiry.read ? 'bg-primary/5' : ''}
                  >
                    <TableCell>
                      <div>
                        <p className={`font-medium ${!inquiry.read ? 'text-foreground' : ''}`}>
                          {inquiry.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className={`truncate max-w-[200px] ${!inquiry.read ? 'font-medium' : ''}`}>
                        {inquiry.subject || inquiry.message.slice(0, 50)}
                      </p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(inquiry.created_at), 'MMM d, yyyy h:mm a')}
                    </TableCell>
                    <TableCell>
                      {inquiry.read ? (
                        <Badge variant="secondary">Read</Badge>
                      ) : (
                        <Badge className="bg-primary/20 text-primary">New</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => viewInquiry(inquiry)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        asChild
                      >
                        <a href={`mailto:${inquiry.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(inquiry.id)} 
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Inquiry Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedInquiry.email}</p>
                </div>
              </div>
              {selectedInquiry.subject && (
                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-medium">{selectedInquiry.subject}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Message</p>
                <p className="mt-1 whitespace-pre-wrap bg-muted/50 p-4 rounded-lg">
                  {selectedInquiry.message}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Received</p>
                <p>{format(new Date(selectedInquiry.created_at), 'MMMM d, yyyy at h:mm a')}</p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selectedInquiry.email}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInquiries;

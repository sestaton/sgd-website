#!/usr/bin/env perl

use 5.010;
use strict;
use warnings;
use Data::Dump::Color;

my $usage = "$0 gex.html annot.tsv\n";
my $html  = shift or die $usage;
my $table;

$table //= '/moonriseNFS/HA412/annotation/ubc_annotation/genes/Ha412v1r1_CDS_iprscan_v1.0.tsv.gz';
my $genes = '/moonriseNFS/HA412/annotation/ubc_annotation/genes/Ha412v1r1_genes_v1.0.fasta.gz';

my %coords;
open my $in, '-|', 'zcat', $genes or die $!;
while (<$in>) {
    chomp;
    if (/^>/) {
	#>Ha10_00000001 Ha10_61357-62306
	s/>//;
	my ($id, $num, $id2, $s, $e) = split /[\s+_-]/;
	#say join q{ }, $id, $num, $id2, $s, $e;
	push @{$coords{$id}}, join "_", $id, $num, $s, $e;
    }

}

dd \%coords;

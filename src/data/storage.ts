import type { EraYear, Exhibit } from './history'

// Representative media available in each era, not claims of invention in that year.
export const storageExhibits: Record<EraYear, Exhibit> = {
  1995: {
    id: 'floppy-storage',
    year: 1995,
    category: 'software',
    name: 'The 3½-inch floppy disk',
    subtitle: 'A small square of portable memory.',
    date: 'High-density disks in everyday use in 1995',
    description:
      'A plastic case protected a magnetic disk that you could carry between computers. High-density 3½-inch floppies were a common way to move small files and install software.',
    facts: [
      'A common high-density format stored about 1.44 MB',
      'Files were read by a mechanical disk drive',
      'Larger software packages could require multiple disks',
    ],
    source: {
      label: 'Computer History Museum · Memory & Storage',
      url: 'https://www.computerhistory.org/timeline/memory-storage/',
    },
    tag: 'CARRY YOUR FILES',
  },
  2010: {
    id: 'usb-storage',
    year: 2010,
    category: 'software',
    name: 'The USB flash drive',
    subtitle: 'Your files, without the moving parts.',
    date: 'Established portable storage by 2010',
    description:
      'USB flash drives used non-volatile semiconductor memory in a pocket-sized device. By 2010, gigabyte-scale drives made it practical to carry photos, documents, and other files without a disk drive.',
    facts: [
      'Solid-state flash memory retains data without power',
      'USB connects the drive to compatible computers',
      'Available capacities varied by model and price',
    ],
    source: {
      label: 'Computer History Museum · 2000',
      url: 'https://www.computerhistory.org/timeline/2000/',
    },
    tag: 'POCKET-SIZED STORAGE',
  },
  2026: {
    id: 'nvme-storage',
    year: 2026,
    category: 'software',
    name: 'NVMe solid-state storage',
    subtitle: 'Fast storage, close to the processor.',
    date: '2026 platform snapshot · established technology',
    description:
      'NVMe is a protocol for communicating with non-volatile storage, commonly over PCI Express. Modern solid-state drives use flash memory and parallel access rather than the moving heads of a hard disk.',
    facts: [
      'NVMe is a protocol, not a capacity or a memory material',
      'Solid-state drives have no mechanical read/write head',
      'Performance depends on the drive, interface, and workload',
    ],
    source: {
      label: 'NVM Express · Specifications',
      url: 'https://nvmexpress.org/specifications/',
    },
    tag: 'NO MOVING PARTS',
  },
}

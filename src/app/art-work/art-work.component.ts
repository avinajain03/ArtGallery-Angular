import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { ApiCallService } from 'src/api-call.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artwork } from 'src/artwork';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-art-work',
  templateUrl: './art-work.component.html',
  styleUrls: ['./art-work.component.css']
})
export class ArtWorkComponent implements OnInit{

  artworkData: any = [];
  artistData: any = [];
  searchTerm?: string;
  displayArtworkData: any = [];
  departments: string[] = ['American Art', 'African Art', 'European Decorative Arts', 'Asian Art'];
  currentPage = 1;
  itemsPerPage = 12;
  favorites: Artwork[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiCallService, private http:HttpClient) {}

  ngOnInit() {
    this.getArtworks();
    this.getArtists();
  }

  getArtworks() {
    const pageIndex = 1;
    const pageSize = 100;
    this.apiService.getArtworks(pageIndex, pageSize).subscribe((data) => {
      this.artworkData = data;
      this.displayArtworkData = data;
    });
  }
  getArtists() {
    const pageIndex = 1;
    const pageSize = 100;
    this.apiService.getArtists(pageIndex, pageSize).subscribe((data) => {
      this.artistData = data;
    });
  }

  getImageUrl(imageId: string):string  {
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
    
  }


  filterBySearch() {
    if (!this.searchTerm) {
      this.displayArtworkData = this.artworkData;
      return;
    }
    const regExp = new RegExp(this.searchTerm, 'i');
    const filteredArtworks = this.artworkData.filter((item: any) =>
      item.title.search(regExp) >= 0 || item.artist_display.search(regExp) >= 0
    );
    this.displayArtworkData = filteredArtworks;
  }
  
  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
  }

  getDisplayedArtworks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.displayArtworkData.slice(startIndex, endIndex);
  }

  addToFavorites(artwork: Artwork) { 
    this.apiService.addToFavorites(artwork);
  }

  
  
}





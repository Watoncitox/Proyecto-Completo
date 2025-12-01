package cl.duoc.style.and.beauty.categoria.service;

import cl.duoc.style.and.beauty.categoria.dto.CategoriaDTO;
import cl.duoc.style.and.beauty.categoria.dto.CategoriaRequestDTO;
import cl.duoc.style.and.beauty.categoria.model.Categoria;
import cl.duoc.style.and.beauty.categoria.repository.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    private CategoriaDTO toDTO(Categoria categoria) {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setId(categoria.getId());
        dto.setNombre(categoria.getNombre());
        return dto;
    }

    private Categoria toEntity(CategoriaRequestDTO dto) {
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getNombre());
        return categoria;
    }

    public List<CategoriaDTO> findAll() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CategoriaDTO findById(Long id) {
        return repository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public CategoriaDTO create(CategoriaRequestDTO dto) {
        Categoria c = toEntity(dto);
        return toDTO(repository.save(c));
    }

    public CategoriaDTO update(Long id, CategoriaRequestDTO dto) {
        return repository.findById(id)
                .map(existing -> {
                    existing.setNombre(dto.getNombre());
                    return toDTO(repository.save(existing));
                })
                .orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
